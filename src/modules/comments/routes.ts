import { ensureAuthenticated } from '@app/modules/auth/hooks/ensure-authenticated';
import { checkCommentExistenceAndOwnership } from '@app/modules/comments/hooks/check-comment-existence-and-ownership';
import {
  createCommentSchema,
  deleteCommentSchema,
  getCommentSchema,
  getPostCommentsSchema,
  updateCommentSchema,
} from '@app/modules/comments/schemas/base';
import type { FastifyPluginCallbackJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';

const comments: FastifyPluginCallbackJsonSchemaToTs = (server, _options, done) => {
  const commentsController = server.factory.createCommentsController();
  const postCommentsController = server.factory.createPostCommentsController();

  server.post('/comments', { ...createCommentSchema, preHandler: ensureAuthenticated }, (request, reply) => {
    const comment = commentsController.create(request.body, request.tokenPayload!.user.id);
    if (comment) {
      reply.code(201).sendSuccess({ comment });
    } else {
      reply.code(404).sendFail({ message: 'Post not found' });
    }
  });

  server.get('/posts/:id/comments', getPostCommentsSchema, (request, reply) => {
    const comments = postCommentsController.readAll(request.params.id);
    if (comments) {
      reply.sendSuccess({ comments });
    } else {
      reply.code(404).sendFail({ message: 'Post not found' });
    }
  });

  server.get('/comments/:id', getCommentSchema, (request, reply) => {
    const comment = commentsController.read(request.params.id);
    if (comment) {
      reply.sendSuccess({ comment });
    } else {
      reply.code(404).sendFail({ message: 'Comment not found' });
    }
  });

  server.put(
    '/comments/:id',
    { ...updateCommentSchema, preHandler: [ensureAuthenticated, checkCommentExistenceAndOwnership] },
    (request, reply) => {
      const updatedComment = commentsController.update(request.params.id, request.body);
      if (updatedComment) {
        reply.sendSuccess({ comment: updatedComment });
      } else {
        reply.code(404).sendFail({ message: 'Comment not found' });
      }
    },
  );

  server.delete(
    '/comments/:id',
    { ...deleteCommentSchema, preHandler: [ensureAuthenticated, checkCommentExistenceAndOwnership] },
    (request, reply) => {
      const isDeleted = commentsController.delete(request.params.id);
      if (isDeleted) {
        reply.code(204).send();
      } else {
        reply.code(404).sendFail({ message: 'Comment not found' });
      }
    },
  );

  done();
};

// eslint-disable-next-line import/no-default-export
export default comments;
