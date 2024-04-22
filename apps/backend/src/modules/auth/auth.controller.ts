import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleTokenDto } from './dto/google-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google')
  async google(@Body() { token }: GoogleTokenDto) {
    return await this.authService.googleAuth(token);
  }
}
