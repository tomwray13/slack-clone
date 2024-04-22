import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [CoreModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
