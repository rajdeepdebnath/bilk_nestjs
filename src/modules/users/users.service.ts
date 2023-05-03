import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptionsWhere, IsNull, Not, Repository } from 'typeorm';
import { EnumCorpTypes } from '../corp-types/entities/enum-corp-types.entity';
import { BrandsService } from '../brands/brands.service';
import { BrokeragesService } from '../brokerages/brokerages.service';
import { LoginUserDto } from './dto/login-user.dto';
import { PasswordService } from 'src/shared/password.service';
import { AuthService } from '../auth/auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { GetUsersQueryDto } from './dto/get-users-query.dto';
import { Role } from '../authorization/enums/role.enum';
import { CreateNewAdminDto } from './dto/create-new-admin.dto';
import { EditAdminDto } from './dto/edit-admin.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private brokeragesService: BrokeragesService,
    private brandsService: BrandsService,
    private readonly passwordService: PasswordService,
    private readonly authService: AuthService,
  ) {}

  async getAllUsers(dto: GetUsersQueryDto) {
    const query = this.userRepo.createQueryBuilder('user');

    if (dto.searchString) {
      query
        .andWhere('user.email ilike :customerEmail', {
          customerEmail: `%${dto.searchString}%`,
        })
        .orWhere(
          "concat(user.first_name, ' ', user.last_name) ilike" + ' :fullName',
          {
            fullName: `%${dto.searchString}%`,
          },
        );
    }

    if (dto.roles) {
      if (dto.roles.includes(Role.Admin)) {
        query.andWhere('user.isAdmin = true');
      }
      if (dto.roles.includes(Role.Broker)) {
        query.andWhere('user.brokerageId is not NULL');
      }
      if (dto.roles.includes(Role.BrandRep)) {
        query.andWhere('user.brandId is not NULL');
      }
    }

    if (dto.sortBy && dto.orderBy) {
      query.addOrderBy(`user.${dto.sortBy}`, dto.orderBy);
    }

    const retailersQueryResp = await query
      .take(dto.limit)
      .skip((dto.pageNo - 1) * dto.limit)
      .getManyAndCount();

    const users = retailersQueryResp[0];
    const totalCount = retailersQueryResp[1];

    return {
      users,
      totalCount,
    };
  }

  async registerUser(newUser: RegisterUserDto): Promise<{ user: User }> {
    await this.validateUserCreation(newUser);

    const { companyName, corpType } = newUser;

    const tobeCreatedUser = this.userRepo.create({ ...newUser });
    if (corpType === 'Brand') {
      const brand = await this.brandsService.createBrandName(companyName);
      tobeCreatedUser.brandId = brand.id;
    } else if (corpType === 'Brokerage') {
      const brokerage = await this.brokeragesService.createBrokerageName(
        companyName,
      );
      tobeCreatedUser.brokerageId = brokerage.id;
    }
    tobeCreatedUser.companyPermission = 'Admin';

    const user = await this.createUser(tobeCreatedUser);
    return { user };
  }

  async authenticateUser(login: LoginUserDto) {
    const { email, password } = login;

    // validate user input
    const user = await this.findOneByEmail(email, true);

    // compare passwords
    const areEqual = await this.passwordService.comparePassword(
      password,
      user.password,
    );

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // generate and sign token
    const token = this.authService.createToken(user.id);
    const userWithoutPassword = await this.findOneByEmail(email);

    return {
      token,
      user: userWithoutPassword,
    };
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  /* Used to attach user with every request */
  async findOneById(id: number): Promise<User> {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('role.permissions', 'permissions')
      .where({ id })

      .getOneOrFail();

    return user;
    // return this.userRepo.findOneBy({ id });
  }

  // ============== Admin Methods
  async createNewAdmin(createNewAdminDto: CreateNewAdminDto) {
    await this.validateNoExistingUserByEmail(createNewAdminDto.email);
    const user = await this.createUser(
      this.userRepo.create({ ...createNewAdminDto, isAdmin: true }),
    );
    return { user };
  }

  async editAdmin(id: number, body: EditAdminDto) {
    await this.validateNoExistingUserByEmail(body.email);
    const resp = await this.userRepo.update({ id }, body);
    if (!(resp.affected && resp.affected > 0)) {
      throw new BadRequestException('updateOperationNotSuccessful');
    }
    return { message: 'updatedSuccesfully' };
  }

  // Remove admin status from a user
  async removeAdmin(id: number) {
    const resp = await this.userRepo.update(id, { isAdmin: false });
    if (!(resp.affected && resp.affected > 0)) {
      throw new BadRequestException('updateOperationNotSuccessful');
    }
    return { message: 'updatedSuccesfully' };
  }

  // ============== /Admin Methods

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return this.userRepo.delete(id);
  // }

  // Use to fetch a validated user. Throws error if user does not exist.
  async findOneByEmail(email: string, includePassword = false): Promise<User> {
    const userInDb = await this.userRepo.findOneBy({ email });
    if (!userInDb) {
      throw new HttpException('User does not exist', HttpStatus.UNAUTHORIZED);
    }

    if (includePassword) {
      const userPassword = await this.userRepo.findOne({
        where: { email },
        select: ['password'],
      });
      userInDb.password = userPassword!.password;
    }
    return userInDb;
  }

  // ========= private methods

  //  Checks if the user or corp(brand/brokerage) already exists. If so, throws error.
  private async validateUserCreation(newUser: RegisterUserDto) {
    const { email, companyName, corpType } = newUser;

    await this.validateNoExistingUserByEmail(email);

    const corpIsRegistered =
      corpType === 'Brand'
        ? await this.brandsService.findOneByName(companyName)
        : await this.brokeragesService.findOneByName(companyName);
    if (corpIsRegistered) {
      // Todo: Improve error type
      throw new Error('companyAlreadyRegistered');
    }
  }

  // validate email to make sure no user with given email exists. Throws error if a user exists.
  private async validateNoExistingUserByEmail(email: string) {
    // validate user input
    const emailIsRegistered = await this.userRepo.findOneBy({ email });

    if (emailIsRegistered) {
      // Todo: Improve error type
      throw new BadRequestException('emailAlreadyRegistered');
    }
  }

  // Always use this function to create a new user in DB. This function converts a string paswword to hash as well using @beforeInsert.
  private async createUser(userToBeCreated: User): Promise<User> {
    // To ensure beforeInsert will be called
    const tobeCreatedUser = this.userRepo.create({ ...userToBeCreated });
    // save the user
    const createdUser = await this.userRepo.save(tobeCreatedUser);
    // User fetched again to ensure password field is not sent.
    const user = await this.userRepo.findOneOrFail({
      where: { id: createdUser.id },
    });
    return user;
  }
}
