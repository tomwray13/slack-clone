import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { UserService } from '../../../user/user.service';
import { FindUserDto } from '../../../user/dto/find-user.dto';

@Injectable()
export class SignInPipe implements PipeTransform {
  constructor(private readonly userService: UserService) {}

  async transform(findUserDto: FindUserDto) {
    const user = await this.userService.findOne({ email: findUserDto.email });
    if (!user) {
      throw new NotFoundException(
        `User with email ${findUserDto.email} does not exist, please create an account`,
      );
    }
    return findUserDto;
  }
}
