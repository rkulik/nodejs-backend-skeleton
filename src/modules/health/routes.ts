import { getHealthSchema } from '@app/modules/health/schemas/base';
import type { FastifyPluginCallbackJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';

const health: FastifyPluginCallbackJsonSchemaToTs = (server, _options, done) => {
  server.get('/health', getHealthSchema, (_request, reply) => {
    reply.sendSuccess({ status: 'healthy' });
  });

  done();
};

// eslint-disable-next-line import/no-default-export
export default health;
