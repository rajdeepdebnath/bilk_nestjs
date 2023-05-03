import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateRoleDto {
  /*
  Name of the role to be created
  @example intern
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /*
  Brokerage ID for which the role is being created. Either brokerageId or brandId should be mentioned. Not both.
  @example 1
   */
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  brokerageId?: number;

  /*
  Brand ID for which the role is being created. Either brokerageId or brandId should be mentioned. Not both.
   */
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  brandId?: number;
}
