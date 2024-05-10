import { buildInstance } from '@setup/build-instance';
import supertest from 'supertest';

const AUTH_API = '/api/v1/auth';

const instance = buildInstance();

const registerUser = (body: Record<string, unknown>): Promise<supertest.Response> => {
  return supertest(instance.server).post(`${AUTH_API}/register`).send(body);
};

const loginUser = (body: Record<string, unknown>): Promise<supertest.Response> => {
  return supertest(instance.server).post(`${AUTH_API}/login`).send(body);
};

describe('auth', () => {
  beforeAll(async () => {
    await instance.ready();
  });

  afterAll(() => {
    instance.close();
  });

  it('should register a new user', async () => {
    const response = await registerUser({ name: 'John', email: 'john@doe.com', password: 'pw' });

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject({
      status: 'success',
      data: {
        user: {
          id: 1,
          name: 'John',
          updatedAt: null,
        },
      },
    });
  });

  it('should fail registration if email is already taken', async () => {
    await registerUser({ name: 'John', email: 'john@doe.com', password: 'pw' });
    const response = await registerUser({ name: 'John', email: 'john@doe.com', password: 'pw' });

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(400);
    expect(response.body).toMatchObject({
      status: 'error',
      message: 'Registration failed',
    });
  });

  it('should login an user', async () => {
    await registerUser({ name: 'John', email: 'john@doe.com', password: 'pw' });
    const response = await loginUser({ email: 'john@doe.com', password: 'pw' });

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data).toHaveProperty('accessToken');
  });

  it('should fail login if invalid credentials were provided', async () => {
    const response = await loginUser({ email: 'john@doe.com', password: 'pw' });

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(401);
    expect(response.body).toMatchObject({
      status: 'error',
      message: 'Invalid email or password',
    });
  });
});
