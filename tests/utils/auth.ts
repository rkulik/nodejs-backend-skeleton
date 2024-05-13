import { LoginUserDto, RegisterUserDto } from '@modules/auth/schemas/base';
import { RawServerDefault } from 'fastify';
import supertest, { Response } from 'supertest';

const AUTH_API = '/api/v1/auth';

export const registerUser = (server: RawServerDefault, body: RegisterUserDto): Promise<Response> => {
  return supertest(server).post(`${AUTH_API}/register`).send(body);
};

export const loginUser = (server: RawServerDefault, body: LoginUserDto): Promise<Response> => {
  return supertest(server).post(`${AUTH_API}/login`).send(body);
};

export const initializeUser = async (server: RawServerDefault, registerUserDto: RegisterUserDto): Promise<Response> => {
  await registerUser(server, registerUserDto);

  return loginUser(server, { email: registerUserDto.email, password: registerUserDto.password });
};
