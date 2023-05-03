import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  isNotEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from 'src/modules/addresses/dto/create-address.dto';
import { CustomOptionsTransformer } from 'src/shared/transformer.helper';

export class CreateRetailerDto {
  @ApiProperty({ example: 'https://s3.com' })
  @IsUrl()
  logoUrl: string;

  @ApiProperty({ example: 'Acme retailer co' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsOptional()
  exclusiveAccessBrokerId: number;

  @ApiProperty({ example: 'Super awesome retailer' })
  @IsString()
  bio: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @ApiProperty({ example: 'https://somewebsite.com' })
  @IsUrl()
  website: string;

  @ApiProperty({ example: 'Active' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ example: 'United States' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  regionId: number;

  @ApiProperty({ example: '1980' })
  @IsString()
  founded: string;

  @ApiProperty({ example: '2B+' })
  @IsString()
  revenue: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  employeeCount: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  storeCount: number;
}
