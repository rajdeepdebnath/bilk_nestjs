import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetRegionsQueryDto {
  @ApiProperty({
    example: 'United States',
  })
  @IsOptional()
  country?: string;
}
