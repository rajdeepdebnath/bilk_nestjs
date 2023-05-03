import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { OrderBy } from 'src/shared/enums/shared-enums';
import { RetailersSortBy } from '../enums/retailers-sort-by.enum';

export class GetAllRetailersQueryDto {
  @ApiProperty({ example: 'Acme' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  regionId?: number;

  @ApiProperty({ example: 'United States' })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({ enum: RetailersSortBy, required: false })
  @IsOptional()
  @Type(() => String)
  @IsEnum(RetailersSortBy)
  sortBy?: RetailersSortBy;

  @ApiProperty({ enum: OrderBy, required: false })
  @IsOptional()
  @Type(() => String)
  @IsEnum(OrderBy)
  orderBy?: OrderBy;

  @ApiProperty({ example: 10 })
  @Type(() => Number)
  @IsInt()
  limit: number;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  pageNo: number;
}
