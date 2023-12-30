import { Injectable } from '@nestjs/common';
import { EmailService } from '../../services/email/email.service';
import { UuidService } from '../../services/uuid/uuid.service';
import { FindUserDto } from '../user/dto/find-user.dto';
import { ConfigService } from '@nestjs/config';
import { CacheService } from '../../core/cache/cache.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  private webClient: string;
  constructor(
    private readonly emailService: EmailService,
    private readonly uuidService: UuidService,
    private readonly configService: ConfigService,
    private readonly cacheService: CacheService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    this.webClient = this.configService.getOrThrow(`apps.web`);
  }

  async magicSignIn({ email }: FindUserDto) {
    const magicLink = await this.createMagicLink(email);
    return this.emailService.send({
      email: [email],
      subject: `Magic Sign In - Slack Clone`,
      html: `<a href="${magicLink}">Sign in to Slack Clone</a>`,
    });
  }

  async magicSignUp(data: CreateUserDto) {
    await this.userService.create(data);
    const magicLink = await this.createMagicLink(data.email);
    return this.emailService.send({
      email: [data.email],
      subject: `Magic Sign Up - Slack Clone`,
      html: `<a href="${magicLink}">Sign in to Slack Clone</a>`,
    });
  }

  async magicVerify(user: User) {
    return await this.generateAccessToken(user);
  }

  async generateAccessToken(user: User) {
    return await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  }

  private async createMagicLink(email: string) {
    const uuid = this.uuidService.generate();
    await this.cacheService.set(`magic:${uuid}`, email, 60 * 15);
    return `${this.webClient}/auth/magic/${uuid}`;
  }
}
