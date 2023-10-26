import { ConflictException, Injectable, PipeTransform } from '@nestjs/common';
import { UserService } from '../../../user/user.service';
import { CreateUserDto } from '../../../user/dto/create-user.dto';

@Injectable()
export class SignUpPipe implements PipeTransform {
  constructor(private readonly userService: UserService) {}

  async transform(createUserDto: CreateUserDto) {
    const user = await this.userService.findOne({ email: createUserDto.email });
    if (user) {
      throw new ConflictException(
        `User with email ${createUserDto.email} already exists, please sign in`,
      );
    }
    return createUserDto;
  }
}
