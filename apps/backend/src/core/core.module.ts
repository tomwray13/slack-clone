import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../config';
import { TransformResponseInterceptor } from './interceptors/transform-response.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Logger } from './logger/logger.service';
import { Global } from '@nestjs/common/decorators';
import { MiddlewareConsumer } from '@nestjs/common/interfaces';
import { LoggerMiddleware } from './logger/logger.middleware';
import { RequestMethod } from '@nestjs/common/enums';
import { CacheService } from './cache/cache.service';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get('redis.username');
        const password = configService.get('redis.password');
        return {
          isGlobal: true,
          store: redisStore,
          host: configService.get('redis.host'),
          port: configService.get('redis.port'),
          ...(username && { username }),
          ...(password && { password }),
          no_ready_check: true,
          ttl: 10,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: TransformResponseInterceptor },
    Logger,
    CacheService,
  ],
  exports: [Logger, CacheService],
})
export class CoreModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
