import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { ChannelModule } from './modules/channel/channel.module';
import { MessageModule } from './modules/message/message.module';

@Module({
  imports: [CoreModule, ChannelModule, MessageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
