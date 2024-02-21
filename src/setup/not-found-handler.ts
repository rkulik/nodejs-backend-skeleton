import { RouteHandlerMethod } from 'fastify';

export const notFoundHandler: RouteHandlerMethod = (_request, reply) => {
  reply.status(404).sendFail({ message: 'Not found' });
};
