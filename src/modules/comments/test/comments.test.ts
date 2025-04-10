/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { initializeUser } from '@app/modules/auth/test/utils';
import {
  createPostComment,
  deleteComment,
  getComment,
  getPostComments,
  updateComment,
} from '@app/modules/comments/test/utils';
import { createPost, deletePost } from '@app/modules/posts/test/utils';
import { buildInstance } from '@app/setup/build-instance';
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';

const instance = buildInstance();
const server = instance.server;

describe('comments', () => {
  beforeAll(async () => {
    await instance.ready();
  });

  afterAll(async () => {
    await instance.close();
  });

  it('should create a comment', async () => {
    const userResponse = await initializeUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });
    const accessToken = userResponse.body.data.accessToken;
    const postResponse = await createPost(server, accessToken, {
      title: 'Some post title',
      content: 'Some post content',
    });
    const postId = postResponse.body.data.id;

    const response = await createPostComment(server, accessToken, postId, { content: 'Some content' });

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject({
      status: 'success',
      data: { id: 1, postId, content: 'Some content' },
    });
  });

  it('should not create a comment if not authenticated', async () => {
    const userResponse = await initializeUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });
    const accessToken = userResponse.body.data.accessToken;
    const postResponse = await createPost(server, accessToken, {
      title: 'Some post title',
      content: 'Some post content',
    });

    const response = await createPostComment(server, 'invalid access token', postResponse.body.data.id, {
      content: 'Some content',
    });

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(401);
    expect(response.body).toMatchObject({ status: 'error', message: 'Not authorized' });
  });

  it('should not create a comment if post does not exist', async () => {
    const userResponse = await initializeUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });

    const response = await createPostComment(server, userResponse.body.data.accessToken, 1, {
      content: 'Some content',
    });

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(404);
    expect(response.body).toMatchObject({ status: 'fail', data: { message: 'Post not found' } });
  });

  it('should get a specific comment', async () => {
    const userResponse = await initializeUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });
    const accessToken = userResponse.body.data.accessToken;
    const postResponse = await createPost(server, accessToken, {
      title: 'Some post title',
      content: 'Some post content',
    });
    const postId = postResponse.body.data.id;
    const commentResponse = await createPostComment(server, accessToken, postId, { content: 'Some content' });

    const response = await getComment(server, commentResponse.body.data.id);

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      status: 'success',
      data: { id: 1, postId, content: 'Some content' },
    });
  });

  it('should not get a specific comment if comment does not exist', async () => {
    const response = await getComment(server, 1);

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(404);
    expect(response.body).toMatchObject({ status: 'fail', data: { message: 'Comment not found' } });
  });

  it('should get all comment of a post', async () => {
    const userResponse = await initializeUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });
    const postResponse = await createPost(server, userResponse.body.data.accessToken, {
      title: 'Some post title',
      content: 'Some post content',
    });

    const response = await getPostComments(server, postResponse.body.data.id);

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({ status: 'success', data: [] });
  });

  it('should update a comment', async () => {
    const userResponse = await initializeUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });
    const accessToken = userResponse.body.data.accessToken;
    const postResponse = await createPost(server, accessToken, {
      title: 'Some post title',
      content: 'Some post content',
    });
    const postId = postResponse.body.data.id;
    const commentResponse = await createPostComment(server, accessToken, postId, { content: 'Some content' });

    const response = await updateComment(server, accessToken, commentResponse.body.data.id, {
      content: 'Some updated content',
    });

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      status: 'success',
      data: { id: 1, postId, content: 'Some updated content' },
    });
  });

  it('should not update a comment if not authenticated', async () => {
    const userResponse = await initializeUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });
    const accessToken = userResponse.body.data.accessToken;
    const postResponse = await createPost(server, accessToken, {
      title: 'Some post title',
      content: 'Some post content',
    });
    const commentResponse = await createPostComment(server, accessToken, postResponse.body.data.id, {
      content: 'Some content',
    });

    const response = await updateComment(server, 'invalid access token', commentResponse.body.data.id, {
      content: 'Some updated content',
    });

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(401);
    expect(response.body).toMatchObject({ status: 'error', message: 'Not authorized' });
  });

  it('should not update a comment if not the owner', async () => {
    const firstUserResponse = await initializeUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });
    const secondUserResponse = await initializeUser(server, { name: 'Jane', email: 'jane@doe.com', password: 'pw' });
    const postResponse = await createPost(server, firstUserResponse.body.data.accessToken, {
      title: 'Some post title',
      content: 'Some post content',
    });
    const commentResponse = await createPostComment(
      server,
      firstUserResponse.body.data.accessToken,
      postResponse.body.data.id,
      {
        content: 'Some content',
      },
    );

    const response = await updateComment(
      server,
      secondUserResponse.body.data.accessToken,
      commentResponse.body.data.id,
      { content: 'Some updated content' },
    );

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(401);
    expect(response.body).toMatchObject({ status: 'error', message: 'Not authorized' });
  });

  it('should not update a comment if comment does not exist', async () => {
    const userResponse = await initializeUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });
    const accessToken = userResponse.body.data.accessToken;
    const postResponse = await createPost(server, accessToken, {
      title: 'Some post title',
      content: 'Some post content',
    });
    await createPostComment(server, accessToken, postResponse.body.data.id, { content: 'Some content' });

    const response = await updateComment(server, accessToken, 2, { content: 'Some updated content' });

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(404);
    expect(response.body).toMatchObject({ status: 'fail', data: { message: 'Comment not found' } });
  });

  it('should delete a comment', async () => {
    const userResponse = await initializeUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });
    const accessToken = userResponse.body.data.accessToken;
    const postResponse = await createPost(server, accessToken, {
      title: 'Some post title',
      content: 'Some post content',
    });
    const commentResponse = await createPostComment(server, accessToken, postResponse.body.data.id, {
      content: 'Some content',
    });

    const response = await deleteComment(server, accessToken, commentResponse.body.data.id);

    expect(response.headers['content-type']).toBe(undefined);
    expect(response.statusCode).toBe(204);
  });

  it('should delete all comments if associated post gets deleted', async () => {
    const userResponse = await initializeUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });
    const accessToken = userResponse.body.data.accessToken;
    const postResponse = await createPost(server, accessToken, {
      title: 'Some post title',
      content: 'Some post content',
    });
    const postId = postResponse.body.data.id;
    const createCommentResponse = await createPostComment(server, accessToken, postId, { content: 'Some content' });

    const getCommentResponse = await getComment(server, createCommentResponse.body.data.id);

    expect(getCommentResponse.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(getCommentResponse.statusCode).toBe(200);
    expect(getCommentResponse.body).toMatchObject({
      status: 'success',
      data: { id: 1, postId, content: 'Some content' },
    });

    await deletePost(server, accessToken, postId);

    const getCommentAfterPostDeletionResponse = await getComment(server, getCommentResponse.body.data.id);

    expect(getCommentAfterPostDeletionResponse.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(getCommentAfterPostDeletionResponse.statusCode).toBe(404);
    expect(getCommentAfterPostDeletionResponse.body).toMatchObject({
      status: 'fail',
      data: { message: 'Comment not found' },
    });
  });

  it('should not delete a comment if not authenticated', async () => {
    const userResponse = await initializeUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });
    const accessToken = userResponse.body.data.accessToken;
    const postResponse = await createPost(server, accessToken, {
      title: 'Some post title',
      content: 'Some post content',
    });
    const commentResponse = await createPostComment(server, accessToken, postResponse.body.data.id, {
      content: 'Some content',
    });

    const response = await deleteComment(server, 'invalid access token', commentResponse.body.data.id);

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(401);
    expect(response.body).toMatchObject({ status: 'error', message: 'Not authorized' });
  });

  it('should not delete a comment if not the owner', async () => {
    const firstUserResponse = await initializeUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });
    const secondUserResponse = await initializeUser(server, { name: 'Jane', email: 'jane@doe.com', password: 'pw' });
    const postResponse = await createPost(server, firstUserResponse.body.data.accessToken, {
      title: 'Some post title',
      content: 'Some post content',
    });
    const commentResponse = await createPostComment(
      server,
      firstUserResponse.body.data.accessToken,
      postResponse.body.data.id,
      {
        content: 'Some content',
      },
    );

    const response = await deleteComment(
      server,
      secondUserResponse.body.data.accessToken,
      commentResponse.body.data.id,
    );

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(401);
    expect(response.body).toMatchObject({ status: 'error', message: 'Not authorized' });
  });

  it('should not delete a comment if comment does not exist', async () => {
    const userResponse = await initializeUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });
    const accessToken = userResponse.body.data.accessToken;
    const postResponse = await createPost(server, accessToken, {
      title: 'Some post title',
      content: 'Some post content',
    });
    await createPostComment(server, accessToken, postResponse.body.data.id, { content: 'Some content' });

    const response = await deleteComment(server, accessToken, 2);

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(404);
    expect(response.body).toMatchObject({ status: 'fail', data: { message: 'Comment not found' } });
  });
});
