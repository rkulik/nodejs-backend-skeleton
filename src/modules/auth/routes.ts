import { FastifyPluginCallbackJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { loginUserSchema, registerUserSchema } from '@modules/auth/schemas/base';

const auth: FastifyPluginCallbackJsonSchemaToTs = (server, _options, done) => {
  const registeredUsersController = server.factory.createRegisteredUsersController();
  const accessTokensController = server.factory.createAccessTokensController();

  server.post('/auth/register', registerUserSchema, async (request, reply) => {
    const registeredUser = await registeredUsersController.create(request.body);
    registeredUser ? reply.sendSuccess({ user: registeredUser }) : reply.code(400).sendError('Registration failed');
  });

  server.post('/auth/login', loginUserSchema, async (request, reply) => {
    const accessToken = await accessTokensController.create(request.body);
    accessToken ? reply.sendSuccess({ accessToken }) : reply.code(401).sendError('Invalid email or password');
  });

  done();
};

// eslint-disable-next-line import/no-default-export
export default auth;
