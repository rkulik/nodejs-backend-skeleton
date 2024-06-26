import { CreateCommentDto, UpdateCommentDto } from '@modules/comments/schemas/base';
import { POSTS_API } from '@tests/utils/posts';
import { RawServerDefault } from 'fastify';
import supertest, { Response } from 'supertest';

const COMMENTS_API = '/api/v1/comments';

export const createComment = (
  server: RawServerDefault,
  accessToken: string,
  body: CreateCommentDto,
): Promise<Response> => {
  return supertest(server).post(COMMENTS_API).set('Authorization', `Bearer ${accessToken}`).send(body);
};

export const getComments = (server: RawServerDefault, postId: number): Promise<Response> => {
  return supertest(server).get(`${POSTS_API}/${postId}/comments`);
};

export const getComment = (server: RawServerDefault, id: number): Promise<Response> => {
  return supertest(server).get(`${COMMENTS_API}/${id}`);
};

export const updateComment = (
  server: RawServerDefault,
  accessToken: string,
  id: number,
  body: UpdateCommentDto,
): Promise<Response> => {
  return supertest(server).put(`${COMMENTS_API}/${id}`).set('Authorization', `Bearer ${accessToken}`).send(body);
};

export const deleteComment = (server: RawServerDefault, accessToken: string, id: number): Promise<Response> => {
  return supertest(server).delete(`${COMMENTS_API}/${id}`).set('Authorization', `Bearer ${accessToken}`);
};
