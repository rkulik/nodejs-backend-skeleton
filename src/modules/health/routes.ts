import { FastifyPluginCallback } from 'fastify';

const health: FastifyPluginCallback = (server, _options, done) => {
  server.get('/health', (_request, reply) => {
    reply.code(200).send({ status: 'OK' });
  });

  done();
};

// eslint-disable-next-line import/no-default-export
export default health;
