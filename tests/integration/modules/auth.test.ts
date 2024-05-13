import { buildInstance } from '@setup/build-instance';
import { loginUser, registerUser } from '@tests/utils/auth';

const instance = buildInstance();
const server = instance.server;

describe('auth', () => {
  beforeAll(async () => {
    await instance.ready();
  });

  afterAll(() => {
    instance.close();
  });

  it('should register a new user', async () => {
    const response = await registerUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject({
      status: 'success',
      data: { user: { id: 1, name: 'John', updatedAt: null } },
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
