import { FastifyPluginCallbackJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { Factory } from '@src/factory';
import fp from 'fastify-plugin';

const factory: FastifyPluginCallbackJsonSchemaToTs = (server, _options, done) => {
  server.decorate('factory', new Factory());

  done();
};

// eslint-disable-next-line import/no-default-export
export default fp(factory);
