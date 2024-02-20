import { FastifyPluginCallbackJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { registerUserSchema } from '@modules/auth/schemas/base';

const auth: FastifyPluginCallbackJsonSchemaToTs = (server, _options, done) => {
  const registeredUsersController = server.factory.createRegisteredUsersController();

  server.post('/auth/register', registerUserSchema, async (request, reply) => {
    const registeredUser = await registeredUsersController.create(request.body);
    registeredUser ? reply.sendSuccess({ user: registeredUser }) : reply.code(400).sendError('Registration failed');
  });

  done();
};

// eslint-disable-next-line import/no-default-export
export default auth;
