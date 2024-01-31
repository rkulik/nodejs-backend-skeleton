import fastify, { FastifyInstance } from 'fastify';

export const buildServer = (): FastifyInstance => {
  return fastify().get('/ping', () => {
    return 'pong\n';
  });
};
