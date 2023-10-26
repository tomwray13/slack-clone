import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { ChannelModule } from './modules/channel/channel.module';
import { MessageModule } from './modules/message/message.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [CoreModule, ChannelModule, MessageModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
