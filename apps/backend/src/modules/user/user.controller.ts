import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../../core/auth/auth.guard';
import { Request } from 'express';

@Controller(`user`)
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(@Req() req: Request & { user?: string }) {
    if (!req.user) {
      throw new BadRequestException();
    }
    const user = this.userService.findOne({ email: req.user });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
