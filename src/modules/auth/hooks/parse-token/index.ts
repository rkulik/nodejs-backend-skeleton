import { FastifyInstance, FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidFastifyRequest = (potentialRequest: any): potentialRequest is FastifyRequest => {
  return !!potentialRequest.headers;
};

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
const parseToken = function (
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

  const [, token] = (request.headers.authorization ?? '').split(' ');
  if (token) {
    request.tokenPayload = this.factory.createJwtHandler().verify(token);
  }

  done();
};

// eslint-disable-next-line import/no-default-export
export default parseToken;
