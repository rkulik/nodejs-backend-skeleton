import { CreatePostDto, PublishPostDto, UpdatePostDto } from '@modules/posts/schemas/base';
import { RawServerDefault } from 'fastify';
import supertest, { Response } from 'supertest';

export const POSTS_API = '/api/v1/posts';
const PUBLISHED_POSTS_API = '/api/v1/published-posts';

export const createPost = (server: RawServerDefault, accessToken: string, body: CreatePostDto): Promise<Response> => {
  return supertest(server).post(POSTS_API).set('Authorization', `Bearer ${accessToken}`).send(body);
};

export const getPosts = (server: RawServerDefault): Promise<Response> => {
  return supertest(server).get(POSTS_API);
};

export const getPost = (server: RawServerDefault, id: number): Promise<Response> => {
  return supertest(server).get(`${POSTS_API}/${id}`);
};

export const updatePost = (
  server: RawServerDefault,
  accessToken: string,
  id: number,
  body: UpdatePostDto,
): Promise<Response> => {
  return supertest(server).put(`${POSTS_API}/${id}`).set('Authorization', `Bearer ${accessToken}`).send(body);
};

export const deletePost = (server: RawServerDefault, accessToken: string, id: number): Promise<Response> => {
  return supertest(server).delete(`${POSTS_API}/${id}`).set('Authorization', `Bearer ${accessToken}`);
};

export const publishPost = (server: RawServerDefault, accessToken: string, body: PublishPostDto): Promise<Response> => {
  return supertest(server).post(PUBLISHED_POSTS_API).set('Authorization', `Bearer ${accessToken}`).send(body);
};

export const unpublishPost = (server: RawServerDefault, accessToken: string, id: number): Promise<Response> => {
  return supertest(server).delete(`${PUBLISHED_POSTS_API}/${id}`).set('Authorization', `Bearer ${accessToken}`);
};
