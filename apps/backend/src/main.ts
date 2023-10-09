import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Logger } from './core/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new Logger() });
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
