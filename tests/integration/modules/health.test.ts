import { buildInstance } from '@setup/build-instance';
import supertest from 'supertest';

const instance = buildInstance();

describe('health', () => {
  beforeAll(async () => {
    await instance.ready();
  });

  afterAll(() => {
    instance.close();
  });

  it('should respond with health information', () => {
    supertest(instance.server)
      .get('/api/v1/health')
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
