import type { FastifyInstance, FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidFastifyRequest = (potentialRequest: any): potentialRequest is FastifyRequest => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return !!potentialRequest.headers;
};

export const parseToken = function (
  this: FastifyInstance,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request: FastifyRequest<Record<string, unknown>, any, any, any>,
  _reply: FastifyReply,
  done: HookHandlerDoneFunction,
): void {
  if (!isValidFastifyRequest(request)) {
    done();
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const [, token] = (request.headers.authorization ?? '').split(' ');
  if (token) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    request.tokenPayload = this.factory.createJwtHandler().verify(token);
  }

  done();
};
