import type { FastifyPluginCallbackJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { getHealthSchema } from '@modules/health/schemas/base';

const health: FastifyPluginCallbackJsonSchemaToTs = (server, _options, done) => {
  server.get('/health', getHealthSchema, (_request, reply) => {
    reply.sendSuccess({ status: 'healthy' });
  });

  done();
};

// eslint-disable-next-line import/no-default-export
export default health;
