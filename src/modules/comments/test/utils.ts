import type { CreatePostCommentDto, UpdateCommentDto } from '@app/modules/comments/schemas/base';
import { POSTS_API } from '@app/modules/posts/test/utils';
import type { RawServerDefault } from 'fastify';
import type { Response } from 'supertest';
import supertest from 'supertest';

const COMMENTS_API = '/api/v1/comments';

export const createPostComment = (
  server: RawServerDefault,
  accessToken: string,
  postId: number,
  body: CreatePostCommentDto,
): Promise<Response> => {
  return supertest(server)
    .post(`${POSTS_API}/${postId}/comments`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send(body);
};

export const getPostComments = (server: RawServerDefault, postId: number): Promise<Response> => {
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
  return supertest(server).patch(`${COMMENTS_API}/${id}`).set('Authorization', `Bearer ${accessToken}`).send(body);
};

export const deleteComment = (server: RawServerDefault, accessToken: string, id: number): Promise<Response> => {
  return supertest(server).delete(`${COMMENTS_API}/${id}`).set('Authorization', `Bearer ${accessToken}`);
};
