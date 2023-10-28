import { Body, Controller, Param, Post, Res, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FindUserDto } from '../user/dto/find-user.dto';
import { SignInPipe } from './pipes/sign-in/sign-in.pipe';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { VerifyMagicPipe } from './pipes/verify-magic/verify-magic.pipe';
import { SignUpPipe } from './pipes/sign-up/sign-up.pipe';
import { User } from '@prisma/client';
import { Response } from 'express';
import { GoogleAuthService } from './google-auth.service';
import { GoogleTokenDto } from './dto/google-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleAuthService: GoogleAuthService,
  ) {}

  @Post('magic/signin')
  @UsePipes(SignInPipe)
  magicSignIn(@Body() findUserDto: FindUserDto) {
    return this.authService.magicSignIn(findUserDto);
  }

  @Post('magic/signup')
  @UsePipes(SignUpPipe)
  magicSignUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.magicSignUp(createUserDto);
  }

  @Post('magic/verify/:uuid')
  async magicVerify(
    @Res({ passthrough: true }) response: Response,
    @Param('uuid', VerifyMagicPipe) user: User,
  ) {
    response.cookie(`token`, `myspecicialtoken`, {
      secure: false,
      httpOnly: false,
      sameSite: false,
    });
    return user;
  }

  @Post('google')
  async google(
    @Res({ passthrough: true }) response: Response,
    @Body() { token }: GoogleTokenDto,
  ) {
    return await this.googleAuthService.authenticate(token);
  }
}
