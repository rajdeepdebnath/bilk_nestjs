import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { OrderBy } from 'src/shared/enums/shared-enums';
import { ReviewScheduleDefaultSortBy } from '../enums/review-schedule-default-sort-by.enum';

export class GetAllReviewScheduleDefaultQueryDto {
  @ApiProperty({ example: 'Acme' })
  @IsString()
  @IsOptional()
  categoryName?: string;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  retailerId?: number;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  categoryId?: number;

  @ApiProperty({ enum: ReviewScheduleDefaultSortBy, required: false })
  @IsOptional()
  @Type(() => String)
  @IsEnum(ReviewScheduleDefaultSortBy)
  sortBy?: ReviewScheduleDefaultSortBy;

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
