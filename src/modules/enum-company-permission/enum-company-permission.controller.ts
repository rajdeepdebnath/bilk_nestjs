import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EnumCompanyPermissionService } from './enum-company-permission.service';
import { CreateEnumCompanyPermissionDto } from './dto/create-enum-company-permission.dto';
import { UpdateEnumCompanyPermissionDto } from './dto/update-enum-company-permission.dto';
import { Role } from '../authorization/enums/role.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('enum-company-permission')
@ApiBearerAuth()
@Controller('enum-company-permission')
export class EnumCompanyPermissionController {
  constructor(
    private readonly enumCompanyPermissionService: EnumCompanyPermissionService,
  ) {}

  /* Get all possible permissions for a brokerage/brand   */
  @Get()
  findAll() {
    return this.enumCompanyPermissionService.findAll();
  }
}
