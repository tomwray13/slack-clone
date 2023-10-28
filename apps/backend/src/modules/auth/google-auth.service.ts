import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client as GoogleOAuth } from 'google-auth-library';
import { UserService } from '../user/user.service';

@Injectable()
export class GoogleAuthService {
  private oauthClient: GoogleOAuth;
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    const clientId = this.configService.getOrThrow(`google.clientId`);
    const clientSecret = this.configService.getOrThrow(`google.clientSecret`);
    this.oauthClient = new GoogleOAuth(clientId, clientSecret);
  }

  async authenticate(idToken: string) {
    const loginTicket = await this.oauthClient.verifyIdToken({ idToken });
    const payload = loginTicket.getPayload();
    if (
      !payload ||
      !payload.email ||
      !payload.given_name ||
      !payload.family_name
    )
      throw new UnauthorizedException();
    const user = await this.userService.findOne({ email: payload.email });
    if (user) return user;
    return this.userService.create({
      email: payload.email,
      firstName: payload.given_name,
      lastName: payload.family_name,
    });
  }
}
