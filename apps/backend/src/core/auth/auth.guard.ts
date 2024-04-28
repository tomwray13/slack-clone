import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const cookies = request.cookies;
    if (!cookies) {
      throw new UnauthorizedException();
    }
    const accessToken = request.cookies[`accessToken`];
    if (!accessToken) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(accessToken);
      // assign user to request object so we can access it later!
      request['user'] = payload.email;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
