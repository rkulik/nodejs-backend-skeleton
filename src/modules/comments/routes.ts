import { FastifyPluginCallbackJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { ensureAuthenticated } from '@modules/auth/hooks/ensure-authenticated';
import {
  createCommentSchema,
  deleteCommentSchema,
  getCommentSchema,
  getPostCommentsSchema,
  updateCommentSchema,
} from '@modules/comments/schemas/base';

const comments: FastifyPluginCallbackJsonSchemaToTs = (server, _options, done) => {
  const commentsController = server.factory.createCommentsController();
  const postCommentsController = server.factory.createPostCommentsController();

  server.post('/comments', { ...createCommentSchema, preHandler: ensureAuthenticated }, (request, reply) => {
    const comment = commentsController.create(request.body, request.tokenPayload!.user.id);
    comment ? reply.code(201).sendSuccess({ comment }) : reply.code(404).sendFail({ message: 'Post not found' });
  });

  server.get('/posts/:id/comments', getPostCommentsSchema, (request, reply) => {
    const comments = postCommentsController.read(request.params.id);
    comments ? reply.sendSuccess({ comments }) : reply.code(404).sendFail({ message: 'Post not found' });
  });

  server.get('/comments/:id', getCommentSchema, (request, reply) => {
    const comment = commentsController.readOne(request.params.id);
    comment ? reply.sendSuccess({ comment }) : reply.code(404).sendFail({ message: 'Comment not found' });
  });

  server.put('/comments/:id', { ...updateCommentSchema, preHandler: ensureAuthenticated }, (request, reply) => {
    const updatedComment = commentsController.update(request.params.id, request.body);
    updatedComment
      ? reply.sendSuccess({ comment: updatedComment })
      : reply.code(404).sendFail({ message: 'Comment not found' });
  });

  server.delete('/comments/:id', { ...deleteCommentSchema, preHandler: ensureAuthenticated }, (request, reply) => {
    const isDeleted = commentsController.delete(request.params.id);
    isDeleted ? reply.code(204).send() : reply.code(404).sendFail({ message: 'Comment not found' });
  });

  done();
};

// eslint-disable-next-line import/no-default-export
export default comments;
