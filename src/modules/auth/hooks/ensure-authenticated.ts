import type { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidFastifyReply = (potentialReply: any): potentialReply is FastifyReply => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return typeof potentialReply.code === 'function' && typeof potentialReply.sendError === 'function';
};

export const ensureAuthenticated = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request: FastifyRequest<Record<string, unknown>, any, any, any>,
  reply: FastifyReply,
  done: HookHandlerDoneFunction,
): void => {
  if (!isValidFastifyReply(reply)) {
    done();
    return;
  }

  if (!request.tokenPayload) {
    reply.code(401).sendError('Not authorized');
  }

  done();
};
