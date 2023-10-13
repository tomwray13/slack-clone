import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { DatabaseModule } from './database/database.module';
import { MessageModule } from './modules/message/message.module';

@Module({
  imports: [CoreModule, DatabaseModule, MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
