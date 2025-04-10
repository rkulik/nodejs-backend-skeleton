import { loginUserSchema, registerUserSchema } from '@app/modules/auth/schemas/base';
import type { FastifyPluginCallbackJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';

const auth: FastifyPluginCallbackJsonSchemaToTs = (server, _options, done) => {
  const registeredUsersController = server.factory.createRegisteredUsersController();
  const accessTokensController = server.factory.createAccessTokensController();

  server.post('/auth/register', registerUserSchema, async (request, reply) => {
    const registeredUser = await registeredUsersController.create(request.body);
    if (registeredUser) {
      reply.code(201).sendSuccess({ user: registeredUser });
    } else {
      reply.code(400).sendError('Registration failed');
    }
  });

  server.post('/auth/login', loginUserSchema, async (request, reply) => {
    const accessToken = await accessTokensController.create(request.body);
    if (accessToken) {
      reply.sendSuccess({ accessToken });
    } else {
      reply.code(401).sendError('Invalid email or password');
    }
  });

  done();
};

// eslint-disable-next-line import/no-default-export
export default auth;
