import { Module } from '@nestjs/common';
import { EnumCompanyPermissionService } from './enum-company-permission.service';
import { EnumCompanyPermissionController } from './enum-company-permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnumCompanyPermission } from './entities/enum-company-permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EnumCompanyPermission])],
  controllers: [EnumCompanyPermissionController],
  providers: [EnumCompanyPermissionService],
})
export class EnumCompanyPermissionModule {}
