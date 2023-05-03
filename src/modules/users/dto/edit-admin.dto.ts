import { OmitType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { CustomOptionsTransformer } from 'src/shared/transformer.helper';
import { CreateNewAdminDto } from './create-new-admin.dto';

export class EditAdminDto extends OmitType(CreateNewAdminDto, [
  'password',
] as const) {}
