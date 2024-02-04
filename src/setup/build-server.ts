import { config } from '@configs/base';
import autload from '@fastify/autoload';
import { CustomFastifyInstance } from '@src/types';
import fastify from 'fastify';
import { ZodTypeProvider, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

import path from 'path';

export const buildServer = (): CustomFastifyInstance => {
  return fastify()
    .setValidatorCompiler(validatorCompiler)
    .setSerializerCompiler(serializerCompiler)
    .withTypeProvider<ZodTypeProvider>()
    .register(autload, {
      dir: path.join(__dirname, '..', 'modules'),
      options: { prefix: config.server.apiPrefix },
      dirNameRoutePrefix: false,
    });
};
