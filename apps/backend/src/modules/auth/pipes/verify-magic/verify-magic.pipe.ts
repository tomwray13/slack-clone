import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { UserService } from '../../../user/user.service';
import { CacheService } from '../../../../core/cache/cache.service';

@Injectable()
export class VerifyMagicPipe implements PipeTransform {
  constructor(
    private readonly userService: UserService,
    private readonly cacheService: CacheService,
  ) {}

  async transform(uuid: string) {
    const email = await this.cacheService.get(`magic:${uuid}`);
    if (!email || typeof email !== `string`) {
      throw new NotFoundException(`Magic link has expired or does not exist`);
    }
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new NotFoundException(
        `User with email ${email} does not exist, please create an account`,
      );
    }
    return user;
  }
}
