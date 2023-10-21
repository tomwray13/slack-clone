import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CreateUserInput } from '../user.types';

export class CreateUserDto implements CreateUserInput {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
