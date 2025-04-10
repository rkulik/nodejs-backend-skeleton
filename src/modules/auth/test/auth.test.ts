/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { loginUser, registerUser } from '@app/modules/auth/test/utils';
import { buildInstance } from '@app/setup/build-instance';
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';

const instance = buildInstance();
const server = instance.server;

describe('auth', () => {
  beforeAll(async () => {
    await instance.ready();
  });

  afterAll(() => {
    void instance.close();
  });

  it('should register a new user', async () => {
    const response = await registerUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject({
      status: 'success',
      data: { id: 1, name: 'John', updatedAt: null },
    });
  });

  it('should fail registration if email is already taken', async () => {
    await registerUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });
    const response = await registerUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(400);
    expect(response.body).toMatchObject({ status: 'error', message: 'Registration failed' });
  });

  it('should login an user', async () => {
    await registerUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });
    const response = await loginUser(server, { email: 'john@doe.com', password: 'pw' });

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data).toHaveProperty('accessToken');
  });

  it('should fail login if invalid credentials were provided', async () => {
    const response = await loginUser(server, { email: 'john@doe.com', password: 'pw' });

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(401);
    expect(response.body).toMatchObject({ status: 'error', message: 'Invalid email or password' });
  });
});
