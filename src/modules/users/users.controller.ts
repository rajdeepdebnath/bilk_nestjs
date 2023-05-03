import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Patch,
  ParseIntPipe,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register-user.dto';
import { Public } from '../auth/decorators/public.decorator';
import { GetUsersQueryDto } from './dto/get-users-query.dto';
import { CreateNewAdminDto } from './dto/create-new-admin.dto';
import { EditAdminDto } from './dto/edit-admin.dto';
import { RequirePermissions } from '../authorization/decorators/require-permissions.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /* 'Get list of all users by broker, brandRep and admin' */
  @ApiBearerAuth()
  @RequirePermissions('Admin.read')
  @Get()
  getAllUsers(@Query() body: GetUsersQueryDto) {
    return this.usersService.getAllUsers(body);
  }

  /* Create a new Admin user */
  @ApiBearerAuth()
  @RequirePermissions('Admin.create')
  @Post('admin')
  createNewAdmin(@Body() body: CreateNewAdminDto) {
    return this.usersService.createNewAdmin(body);
  }

  /* Update an Admin*/
  @ApiBearerAuth()
  @RequirePermissions('Admin.update')
  @Patch(':id/admin')
  editAdmin(@Param('id', ParseIntPipe) id: number, @Body() body: EditAdminDto) {
    return this.usersService.editAdmin(id, body);
  }

  /* Remove an Admin. Technically just removed the admin flag. */
  @ApiBearerAuth()
  @RequirePermissions('Admin.delete')
  @Delete(':id/admin')
  removeAdmin(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.removeAdmin(id);
  }

  @Public()
  @ApiOperation({
    summary: 'Register/signup a new user.',
  })
  @Post('register')
  register(@Body() body: RegisterUserDto) {
    return this.usersService.registerUser(body);
  }

  @Public()
  @ApiOperation({
    summary: 'Login a user',
  })
  @Post('login')
  login(@Body() body: LoginUserDto) {
    return this.usersService.authenticateUser(body);
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findById(@Param('id') id: string) {
  //   return this.usersService.findOneById(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
