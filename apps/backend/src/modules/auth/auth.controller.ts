import { Body, Controller, Param, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FindUserDto } from '../user/dto/find-user.dto';
import { SignInPipe } from './pipes/sign-in/sign-in.pipe';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { VerifyMagicPipe } from './pipes/verify-magic/verify-magic.pipe';
import { SignUpPipe } from './pipes/sign-up/sign-up.pipe';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  magicVerify(@Param('uuid', VerifyMagicPipe) user: User) {
    return user;
  }
}
