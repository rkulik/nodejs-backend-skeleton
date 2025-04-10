import { config } from '@app/configs/base';
import { parseToken } from '@app/modules/auth/hooks/parse-token';
import { errorHandler } from '@app/setup/handlers/error-handler';
import { notFoundHandler } from '@app/setup/handlers/not-found-handler';
import { migrateIfNeeded } from '@app/setup/hooks/migrate-if-needed';
import factory from '@app/setup/plugins/factory';
import jsend from '@app/setup/plugins/jsend';
import autload from '@fastify/autoload';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import type { FastifyInstance } from 'fastify';
import fastify from 'fastify';

import path from 'path';

export const buildInstance = (): FastifyInstance => {
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
      ignorePattern: /test/,
      options: { prefix: config.server.apiPrefix },
      dirNameRoutePrefix: false,
    })
    .setErrorHandler(errorHandler)
    .setNotFoundHandler(notFoundHandler)
    .addHook('onRequest', parseToken)
    .addHook('onReady', migrateIfNeeded);
};
