import { FastifyPluginCallbackJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import ensureAuthenticated from '@modules/auth/hooks/ensure-authenticated';
import {
  createPostSchema,
  deletePostSchema,
  getPostSchema,
  getPostsSchema,
  publishPostSchema,
  unpublishPostSchema,
  updatePostSchema,
} from '@modules/posts/schemas/base';

const posts: FastifyPluginCallbackJsonSchemaToTs = (server, _options, done) => {
  const postsController = server.factory.createPostsController();
  const publishedPostsController = server.factory.createPublishedPostsController();

  server.post('/posts', { ...createPostSchema, preHandler: ensureAuthenticated }, (request, reply) => {
    reply.sendSuccess({ post: postsController.create(request.body) });
  });

  server.get('/posts', getPostsSchema, (_request, reply) => {
    reply.sendSuccess({ posts: postsController.read() });
  });

  server.get('/posts/:id', getPostSchema, (request, reply) => {
    const post = postsController.readOne(request.params.id);
    post ? reply.sendSuccess({ post }) : reply.code(404).sendFail({ message: 'Post not found' });
  });

  server.put('/posts/:id', { ...updatePostSchema, preHandler: ensureAuthenticated }, (request, reply) => {
    const updatedPost = postsController.update(request.params.id, request.body);
    updatedPost ? reply.sendSuccess({ post: updatedPost }) : reply.code(404).sendFail({ message: 'Post not found' });
  });

  server.delete('/posts/:id', { ...deletePostSchema, preHandler: ensureAuthenticated }, (request, reply) => {
    const isDeleted = postsController.delete(request.params.id);
    isDeleted ? reply.code(204).send() : reply.code(404).sendFail({ message: 'Post not found' });
  });

  server.post('/published-posts', { ...publishPostSchema, preHandler: ensureAuthenticated }, (request, reply) => {
    const publishedPost = publishedPostsController.create(request.body);
    publishedPost
      ? reply.sendSuccess({ post: publishedPost })
      : reply.code(404).sendFail({ message: 'Post not found' });
  });

  server.delete(
    '/published-posts/:id',
    { ...unpublishPostSchema, preHandler: ensureAuthenticated },
    (request, reply) => {
      const unpublishedPost = publishedPostsController.delete(request.params.id);
      unpublishedPost
        ? reply.sendSuccess({ post: unpublishedPost })
        : reply.code(404).sendFail({ message: 'Post not found' });
    },
  );

  done();
};

// eslint-disable-next-line import/no-default-export
export default posts;
