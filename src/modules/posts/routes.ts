import { ensureAuthenticated } from '@app/modules/auth/hooks/ensure-authenticated';
import { checkPostExistenceAndOwnership } from '@app/modules/posts/hooks/check-post-existence-and-ownership';
import {
  createPostSchema,
  deletePostSchema,
  getPostSchema,
  getPostsSchema,
  publishPostSchema,
  unpublishPostSchema,
  updatePostSchema,
} from '@app/modules/posts/schemas/base';
import type { FastifyPluginCallbackJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';

const posts: FastifyPluginCallbackJsonSchemaToTs = (server, _options, done) => {
  const postsController = server.factory.createPostsController();
  const publishedPostsController = server.factory.createPublishedPostsController();

  server.post('/posts', { ...createPostSchema, preHandler: ensureAuthenticated }, (request, reply) => {
    reply.code(201).sendSuccess(postsController.create(request.body, request.tokenPayload!.user.id));
  });

  server.get('/posts', getPostsSchema, (_request, reply) => {
    reply.sendSuccess(postsController.readAll());
  });

  server.get('/posts/:id', getPostSchema, (request, reply) => {
    const post = postsController.read(request.params.id);
    if (post) {
      reply.sendSuccess(post);
    } else {
      reply.code(404).sendFail({ message: 'Post not found' });
    }
  });

  server.patch(
    '/posts/:id',
    { ...updatePostSchema, preHandler: [ensureAuthenticated, checkPostExistenceAndOwnership] },
    (request, reply) => {
      const updatedPost = postsController.update(request.params.id, request.body);
      if (updatedPost) {
        reply.sendSuccess(updatedPost);
      } else {
        reply.code(404).sendFail({ message: 'Post not found' });
      }
    },
  );

  server.delete(
    '/posts/:id',
    { ...deletePostSchema, preHandler: [ensureAuthenticated, checkPostExistenceAndOwnership] },
    (request, reply) => {
      const isDeleted = postsController.delete(request.params.id);
      if (isDeleted) {
        reply.code(204).send();
      } else {
        reply.code(404).sendFail({ message: 'Post not found' });
      }
    },
  );

  server.post(
    '/published-posts',
    { ...publishPostSchema, preHandler: [ensureAuthenticated, checkPostExistenceAndOwnership] },
    (request, reply) => {
      const publishedPost = publishedPostsController.create(request.body);
      if (publishedPost) {
        reply.sendSuccess(publishedPost);
      } else {
        reply.code(404).sendFail({ message: 'Post not found' });
      }
    },
  );

  server.delete(
    '/published-posts/:id',
    { ...unpublishPostSchema, preHandler: [ensureAuthenticated, checkPostExistenceAndOwnership] },
    (request, reply) => {
      const unpublishedPost = publishedPostsController.delete(request.params.id);
      if (unpublishedPost) {
        reply.sendSuccess(unpublishedPost);
      } else {
        reply.code(404).sendFail({ message: 'Post not found' });
      }
    },
  );

  done();
};

// eslint-disable-next-line import/no-default-export
export default posts;
