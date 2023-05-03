import { PartialType } from '@nestjs/swagger';
import { CreateEnumCompanyPermissionDto } from './create-enum-company-permission.dto';

export class UpdateEnumCompanyPermissionDto extends PartialType(CreateEnumCompanyPermissionDto) {}
