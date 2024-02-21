import { FastifyInstance } from 'fastify';

export const errorHandler: FastifyInstance['errorHandler'] = (error, _request, reply) => {
  reply.status(error.statusCode ?? 500).sendError(error.message);
};
