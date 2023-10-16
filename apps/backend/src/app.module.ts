import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { DatabaseModule } from './database/database.module';
import { ChannelModule } from './modules/channel/channel.module';

@Module({
  imports: [CoreModule, DatabaseModule, ChannelModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
