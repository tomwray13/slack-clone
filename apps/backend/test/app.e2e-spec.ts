import * as request from 'supertest';
import { server } from './setup';

describe('AppController (e2e)', () => {
  it('/user (GET)', () => {
    return request(server).get('/user').expect(401);
  });
});
