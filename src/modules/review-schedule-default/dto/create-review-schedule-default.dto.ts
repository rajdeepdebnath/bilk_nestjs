import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateReviewScheduleDefaultDto {
  /* retailer id
  @example 1
  */
  @IsInt()
  retailerId: number;

  // TODO: Make sure productCategoryName or productCategoryCustomText is provided.
  /* This value should come from enum product category api. Either productCategoryName or productCategoryCustomText should have a value.
    @example
  */
  @IsString()
  @IsOptional()
  productCategoryName?: string;

  /* This should have a value only if user selects a custom category. Either productCategoryName or productCategoryCustomText should have a value.*/
  @IsString()
  @IsOptional()
  productCategoryCustomText?: string;

  /*
  @example Kombucha
  */
  @IsString()
  @IsOptional()
  subcategory?: string;

  @MaxLength(10)
  @IsDateString({ strict: true })
  @IsOptional()
  meetingStartDate?: Date;

  @IsDate()
  @IsOptional()
  meetingEndDate?: Date;

  @IsDate()
  @IsOptional()
  pogReleaseDate?: Date;

  @IsDate()
  @IsOptional()
  storeResetDate?: Date;
}
