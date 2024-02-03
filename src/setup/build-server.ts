import autload from '@fastify/autoload';
import fastify, { FastifyInstance } from 'fastify';

import path from 'path';

export const buildServer = (): FastifyInstance => {
  return fastify().register(autload, {
    dir: path.join(__dirname, '..', 'modules'),
    options: { prefix: '/api/v1' },
    dirNameRoutePrefix: false,
  });
};
