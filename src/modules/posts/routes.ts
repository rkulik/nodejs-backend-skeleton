import { Factory } from '@app/factory';
import { CreatePostDto, UpdatePostDto } from '@modules/posts/dtos';
import { FastifyPluginCallback } from 'fastify';

const posts: FastifyPluginCallback = (server, _options, done) => {
  const postsController = new Factory().createPostsController();

  server.get('/posts', (_request, reply) => {
    reply.send(postsController.read());
  });

  server.get<{ Params: { id: string } }>('/posts/:id', (request, reply) => {
    const post = postsController.readOne(Number(request.params.id));
    post ? reply.send(post) : reply.code(404).send({ error: { message: 'Not found' } });
  });

  server.post<{ Body: CreatePostDto }>('/posts', (request, reply) => {
    reply.send(postsController.create(request.body));
  });

  server.put<{ Params: { id: string }; Body: UpdatePostDto }>('/posts/:id', (request, reply) => {
    const updatedPost = postsController.update(Number(request.params.id), request.body);
    updatedPost ? reply.send(updatedPost) : reply.code(404).send({ error: { message: 'Not found' } });
  });

  server.delete<{ Params: { id: string } }>('/posts/:id', (request, reply) => {
    const isDeleted = postsController.delete(Number(request.params.id));
    isDeleted ? reply.code(204).send() : reply.code(404).send({ error: { message: 'Not found' } });
  });

  done();
};

// eslint-disable-next-line import/no-default-export
export default posts;
