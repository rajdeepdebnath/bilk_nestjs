import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsOptional,
  IsArray,
  IsString,
  IsInt,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { Role } from 'src/modules/authorization/enums/role.enum';
import { commaSplitString } from 'src/shared/dto-functions/comma-split-string';
import { OrderBy } from 'src/shared/enums/shared-enums';
import { UsersSortBy } from '../enums/users-sort-by.enum';

export class GetUsersQueryDto {
  /*
  Select users of particular roles
   */
  @IsOptional()
  @IsEnum(Role, { each: true })
  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(3)
  @Transform(({ value }) => commaSplitString(value))
  roles?: Role[];

  /*
  Search string to search by name or email
  @example John
   */
  @IsOptional()
  @IsString()
  searchString?: string;

  /*
  Field by which you wanna sort the users by
   */
  @IsOptional()
  @Type(() => String)
  @IsEnum(UsersSortBy)
  sortBy?: UsersSortBy = UsersSortBy.FirstName;

  /*
  By what order to sort by
 */
  @IsOptional()
  @Type(() => String)
  @IsEnum(OrderBy)
  orderBy?: OrderBy = OrderBy.Ascending;

  /*
  Number of entries to fetch
  @example 10
   */
  @Type(() => Number)
  @IsInt()
  limit: number;

  /*
  Page number of the entries to figure out the offset
  @example 1
   */
  @Type(() => Number)
  @IsInt()
  pageNo: number;
}
