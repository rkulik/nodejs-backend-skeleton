import { FastifyPluginCallbackJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import {
  createPostSchema,
  deletePostSchema,
  getPostSchema,
  getPostsSchema,
  updatePostSchema,
} from '@modules/posts/schemas/base';
import { Factory } from '@src/factory';

const posts: FastifyPluginCallbackJsonSchemaToTs = (server, _options, done) => {
  const postsController = new Factory().createPostsController();

  server.post('/posts', createPostSchema, (request, reply) => {
    reply.sendSuccess({ post: postsController.create(request.body) });
  });

  server.get('/posts', getPostsSchema, (_request, reply) => {
    reply.sendSuccess({ posts: postsController.read() });
  });

  server.get('/posts/:id', getPostSchema, (request, reply) => {
    const post = postsController.readOne(Number(request.params.id));
    post ? reply.sendSuccess({ post }) : reply.code(404).sendFail({ message: 'Not found' });
  });

  server.put('/posts/:id', updatePostSchema, (request, reply) => {
    const updatedPost = postsController.update(Number(request.params.id), request.body);
    updatedPost ? reply.sendSuccess({ post: updatedPost }) : reply.code(404).sendFail({ message: 'Not found' });
  });

  server.delete('/posts/:id', deletePostSchema, (request, reply) => {
    const isDeleted = postsController.delete(Number(request.params.id));
    isDeleted ? reply.code(204).send() : reply.code(404).sendFail({ message: 'Not found' });
  });

  done();
};

// eslint-disable-next-line import/no-default-export
export default posts;
