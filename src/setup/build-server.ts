import { config } from '@configs/base';
import autload from '@fastify/autoload';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import parseToken from '@modules/auth/hooks/parse-token';
import { errorHandler } from '@setup/error-handler';
import { migrateIfNeeded } from '@setup/hooks/migrate-if-needed';
import { notFoundHandler } from '@setup/not-found-handler';
import factory from '@setup/plugins/factory';
import jsend from '@setup/plugins/jsend';
import fastify, { FastifyInstance } from 'fastify';

import path from 'path';

export const buildServer = (): FastifyInstance => {
  return fastify()
    .register(factory)
    .register(jsend)
    .register(fastifySwagger, {
      openapi: {
        info: {
          title: 'Node.js backend skeleton',
          description: 'This is a sample server for a Node.js backend skeleton.',
          version: '1.0.0',
        },
      },
    })
    .register(fastifySwaggerUI, {
      routePrefix: `${config.server.apiPrefix}/documentation`,
    })
    .register(autload, {
      dir: path.join(__dirname, '..', 'modules'),
      options: { prefix: config.server.apiPrefix },
      dirNameRoutePrefix: false,
    })
    .setErrorHandler(errorHandler)
    .setNotFoundHandler(notFoundHandler)
    .addHook('onRequest', parseToken)
    .addHook('onReady', migrateIfNeeded);
};
