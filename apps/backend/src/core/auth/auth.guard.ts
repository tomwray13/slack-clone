import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const accessToken = request.cookies[`accessToken`];
    if (!accessToken) {
      throw new UnauthorizedException();
    }
    try {
      await this.jwtService.verifyAsync(accessToken);
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
