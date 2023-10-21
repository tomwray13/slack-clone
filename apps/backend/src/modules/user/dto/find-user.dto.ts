import { IsEmail, IsNotEmpty } from 'class-validator';
import { FindUserInput } from '../user.types';

export class FindUserDto implements FindUserInput {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
