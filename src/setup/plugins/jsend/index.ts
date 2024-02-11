import { FastifyPluginCallbackJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { FastifyReply } from 'fastify';
import fp from 'fastify-plugin';

type Data = Record<string, unknown>;

const jsend: FastifyPluginCallbackJsonSchemaToTs = (server, _options, done) => {
  server.decorateReply('sendSuccess', function (this: FastifyReply, data: Data | null = null): FastifyReply {
    return this.send({ status: 'success', data });
  });

  server.decorateReply('sendFail', function (this: FastifyReply, data: Data): FastifyReply {
    return this.send({ status: 'fail', data });
  });

  server.decorateReply(
    'sendError',
    function (this: FastifyReply, message: string, code?: number, data?: Data): FastifyReply {
      return this.send({ status: 'error', message, code, data });
    },
  );

  done();
};

// eslint-disable-next-line import/no-default-export
export default fp(jsend);
