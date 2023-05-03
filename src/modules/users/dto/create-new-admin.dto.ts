import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { CustomOptionsTransformer } from 'src/shared/transformer.helper';

export class CreateNewAdminDto {
  /*
  First name of admin
  @example 'John'
   */
  @IsString()
  @IsNotEmpty()
  @CustomOptionsTransformer('trim')
  firstName: string;

  /*
  Last name of admin
  @example 'Doe'
   */
  @IsString()
  @IsNotEmpty()
  @CustomOptionsTransformer('trim')
  lastName: string;

  /*
  Email of the admin. Should not exist in DB already.
  @example 'johndoe@yopmail.com'
   */
  @IsEmail()
  @IsNotEmpty()
  @CustomOptionsTransformer('lowercase', 'trim')
  email: string;

  /*
  Password.
  @example 'password'
   */
  @IsString()
  @IsNotEmpty()
  password: string;
}
