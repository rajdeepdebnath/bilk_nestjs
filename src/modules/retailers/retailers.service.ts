import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderBy } from 'src/shared/enums/shared-enums';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateRetailerDto } from './dto/create-retailer.dto';
import { GetAllRetailersQueryDto } from './dto/get-all-retailers-query.dto';
import { UpdateRetailerDto } from './dto/update-retailer.dto';
import { Retailer } from './entities/retailer.entity';
import { RetailersSortBy } from './enums/retailers-sort-by.enum';

@Injectable()
export class RetailersService {
  constructor(
    @InjectRepository(Retailer)
    private retailerRepo: Repository<Retailer>,
  ) {}

  create(createRetailerDto: CreateRetailerDto) {
    return this.retailerRepo.save(createRetailerDto);
  }

  async findAll(getAllRetailersQueryDto: GetAllRetailersQueryDto) {
    const retailersRespQuery = this.retailerRepo.createQueryBuilder('retailer');

    if (getAllRetailersQueryDto?.name) {
      retailersRespQuery.andWhere('retailer.name ILIKE :name', {
        name: `%${getAllRetailersQueryDto.name.trim()}%`,
      });
    }

    if (getAllRetailersQueryDto?.country) {
      retailersRespQuery.andWhere('retailer.country = :value', {
        value: getAllRetailersQueryDto.country,
      });
    }

    if (getAllRetailersQueryDto?.regionId) {
      retailersRespQuery.andWhere('retailer.regionId = :value', {
        value: getAllRetailersQueryDto.regionId,
      });
    }

    if (getAllRetailersQueryDto.sortBy && getAllRetailersQueryDto.orderBy) {
      retailersRespQuery.addOrderBy(
        `retailer.${getAllRetailersQueryDto.sortBy}`,
        getAllRetailersQueryDto.orderBy,
      );
    } else {
      // default order
      retailersRespQuery.addOrderBy(
        `retailer.${RetailersSortBy.Name}`,
        OrderBy.Ascending,
      );
    }

    const retailersQueryResp = await retailersRespQuery
      .take(getAllRetailersQueryDto.limit)
      .skip(
        (getAllRetailersQueryDto.pageNo - 1) * getAllRetailersQueryDto.limit,
      )
      .getManyAndCount();

    const retailers = retailersQueryResp[0];
    const totalCount = retailersQueryResp[1];

    return {
      retailers,
      totalCount,
    };
  }

  async findOne(id: number) {
    const retailer = await this.retailerRepo.findOneOrFail({
      where: { id },
    });
    return { retailer };
  }

  async update(id: number, updateRetailerDto: UpdateRetailerDto) {
    const retailer = await this.retailerRepo.save({
      ...updateRetailerDto,
      id,
    });
    return { retailer };
  }

  async remove(id: number) {
    const delResp = await this.retailerRepo.softDelete(id);
    if (!(delResp.affected && delResp.affected > 0)) {
      throw new BadRequestException('Delete operation not successful');
    }
    return { message: 'deletedSuccesfully' };
  }
}
