import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CustomOptionsTransformer } from 'src/shared/transformer.helper';

export class LoginUserDto {
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
