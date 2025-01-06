import type { FastifyInstance, FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidFastifyReply = (potentialReply: any): potentialReply is FastifyReply => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return typeof potentialReply.code === 'function' && typeof potentialReply.sendError === 'function';
};

export const checkCommentExistenceAndOwnership = function (
  this: FastifyInstance,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request: FastifyRequest<Record<string, unknown>, any, any, any>,
  reply: FastifyReply,
  done: HookHandlerDoneFunction,
): void {
  if (!isValidFastifyReply(reply)) {
    done();
    return;
  }

  const paramsId =
    typeof request.params === 'object' && request.params !== null ? (request.params as { id: number }).id : undefined;

  const bodyId =
    typeof request.body === 'object' && request.body !== null ? (request.body as { id: number }).id : undefined;

  const id = paramsId || bodyId;
  if (!id) {
    reply.code(400).sendFail({ message: 'Bad request' });
    done();
    return;
  }

  const existingComment = this.factory.createCommentsController().read(id);
  if (!existingComment) {
    reply.code(404).sendFail({ message: 'Comment not found' });
    done();
    return;
  }

  if (existingComment.userId !== request.tokenPayload!.user.id) {
    reply.code(401).sendError('Not authorized');
    done();
    return;
  }

  done();
};
