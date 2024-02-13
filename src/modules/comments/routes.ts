import { FastifyPluginCallbackJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import {
  createCommentSchema,
  deleteCommentSchema,
  getCommentSchema,
  updateCommentSchema,
} from '@modules/comments/schemas/base';

const comments: FastifyPluginCallbackJsonSchemaToTs = (server, _options, done) => {
  const commentsController = server.factory.createCommentsController();

  server.post('/comments', createCommentSchema, (request, reply) => {
    const comment = commentsController.create(request.body);
    comment ? reply.sendSuccess({ comment }) : reply.code(404).sendFail({ message: 'Not found' });
  });

  server.get('/comments/:id', getCommentSchema, (request, reply) => {
    const comment = commentsController.readOne(request.params.id);
    comment ? reply.sendSuccess({ comment }) : reply.code(404).sendFail({ message: 'Not found' });
  });

  server.put('/comments/:id', updateCommentSchema, (request, reply) => {
    const updatedComment = commentsController.update(request.params.id, request.body);
    updatedComment
      ? reply.sendSuccess({ comment: updatedComment })
      : reply.code(404).sendFail({ message: 'Not found' });
  });

  server.delete('/comments/:id', deleteCommentSchema, (request, reply) => {
    const isDeleted = commentsController.delete(request.params.id);
    isDeleted ? reply.code(204).send() : reply.code(404).sendFail({ message: 'Not found' });
  });

  done();
};

// eslint-disable-next-line import/no-default-export
export default comments;
