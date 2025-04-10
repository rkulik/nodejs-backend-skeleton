import { afterAll, beforeAll, describe, it } from '@jest/globals';
import { buildInstance } from '@setup/build-instance';
import supertest from 'supertest';

const HEALTH_API = '/api/v1/health';

const instance = buildInstance();
const server = instance.server;

describe('health', () => {
  beforeAll(async () => {
    await instance.ready();
  });

  afterAll(() => {
    void instance.close();
  });

  it('should respond with health information', () => {
    supertest(server)
      .get(HEALTH_API)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect({
        status: 'success',
        data: {
          status: 'healthy',
        },
      });
  });
});
