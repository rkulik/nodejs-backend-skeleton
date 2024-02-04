import { createPostSchema, deletePostSchema, getPostSchema, updatePostSchema } from '@modules/posts/schemas/base';
import { Factory } from '@src/factory';
import { CustomFastifyPluginCallback } from '@src/types';

const posts: CustomFastifyPluginCallback = (server, _options, done) => {
  const postsController = new Factory().createPostsController();

  server.post('/posts', { schema: createPostSchema }, (request, reply) => {
    reply.send(postsController.create(request.body));
  });

  server.get('/posts', (_request, reply) => {
    reply.send(postsController.read());
  });

  server.get('/posts/:id', { schema: getPostSchema }, (request, reply) => {
    const post = postsController.readOne(Number(request.params.id));
    post ? reply.send(post) : reply.code(404).send({ error: { message: 'Not found' } });
  });

  server.put('/posts/:id', { schema: updatePostSchema }, (request, reply) => {
    const updatedPost = postsController.update(Number(request.params.id), request.body);
    updatedPost ? reply.send(updatedPost) : reply.code(404).send({ error: { message: 'Not found' } });
  });

  server.delete('/posts/:id', { schema: deletePostSchema }, (request, reply) => {
    const isDeleted = postsController.delete(Number(request.params.id));
    isDeleted ? reply.code(204).send() : reply.code(404).send({ error: { message: 'Not found' } });
  });

  done();
};

// eslint-disable-next-line import/no-default-export
export default posts;
