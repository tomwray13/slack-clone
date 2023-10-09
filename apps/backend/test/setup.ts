import { HttpServer, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { CacheService } from '../src/core/cache/cache.service';
import { DatabaseService } from '../src/database/database.service';

let app: INestApplication;
let server: HttpServer;
let moduleFixture: TestingModule;
let cache: CacheService;
let database: DatabaseService;

beforeAll(async () => {
  moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  cache = moduleFixture.get<CacheService>(CacheService);
  database = moduleFixture.get<DatabaseService>(DatabaseService);

  await app.init();
  server = app.getHttpServer();
});

afterEach(async () => {
  await database.resetDb();
  await cache.reset();
});

afterAll(async () => {
  await app.close();
});

export { app, server };
