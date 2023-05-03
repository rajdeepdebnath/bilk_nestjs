import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, IsUrl } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ example: 'Miami' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'United States' })
  @IsString()
  country: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  regionId: number;

  @ApiProperty({ example: 'Florida' })
  @IsString()
  state: string;

  @ApiProperty({ example: 'Rue elizabeth' })
  @IsString()
  street: string;

  @ApiProperty({ example: '3b' })
  @IsString()
  unitNumber: string;

  @ApiProperty({ example: '143001' })
  @IsString()
  zipCode: string;
}
