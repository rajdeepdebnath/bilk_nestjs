import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEnumCompanyPermissionDto } from './dto/create-enum-company-permission.dto';
import { UpdateEnumCompanyPermissionDto } from './dto/update-enum-company-permission.dto';
import { EnumCompanyPermission } from './entities/enum-company-permission.entity';

@Injectable()
export class EnumCompanyPermissionService {
  constructor(
    @InjectRepository(EnumCompanyPermission)
    private enumCompanyPermissionRepo: Repository<EnumCompanyPermission>,
  ) {}

  async findAll() {
    const enumCompanyPermissions = await this.enumCompanyPermissionRepo.find();
    return { enumCompanyPermissions };
  }
}
