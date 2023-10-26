import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailModule } from '../../services/email/email.module';
import { UuidModule } from '../../services/uuid/uuid.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [EmailModule, UuidModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
