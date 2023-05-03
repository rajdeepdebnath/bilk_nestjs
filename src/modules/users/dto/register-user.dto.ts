import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CustomOptionsTransformer } from 'src/shared/transformer.helper';
import { CorpTypes } from '../../../database/enum/corpTypes';

export class RegisterUserDto {
  @ApiProperty({ enum: CorpTypes })
  @IsEnum(CorpTypes)
  @IsNotEmpty()
  readonly corpType: CorpTypes;

  @ApiProperty({ example: 'Acme co' })
  @IsString()
  @IsNotEmpty()
  readonly companyName: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty({ example: 'johndoe@yopmail.com' })
  @IsEmail()
  @IsNotEmpty()
  @CustomOptionsTransformer('lowercase', 'trim')
  readonly email: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
