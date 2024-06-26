import { buildInstance } from '@setup/build-instance';
import { initializeUser } from '@tests/utils/auth';
import { createPost, deletePost, getPost, getPosts, publishPost, unpublishPost, updatePost } from '@tests/utils/posts';

const instance = buildInstance();
const server = instance.server;

describe('posts', () => {
  beforeAll(async () => {
    await instance.ready();
  });

  afterAll(() => {
    instance.close();
  });

  it('should create a post', async () => {
    const userResponse = await initializeUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });

    const response = await createPost(server, userResponse.body.data.accessToken, {
      title: 'Some title',
      content: 'Some content',
    });

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject({
      status: 'success',
      data: { post: { id: 1, title: 'Some title', content: 'Some content', publishedAt: null } },
    });
  });

  it('should not create a post if not authenticated', async () => {
    const response = await createPost(server, 'invalid access token', { title: 'Some title', content: 'Some content' });

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(401);
    expect(response.body).toMatchObject({ status: 'error', message: 'Not authorized' });
  });

  it('should get a specific post', async () => {
    const userResponse = await initializeUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });
    await createPost(server, userResponse.body.data.accessToken, { title: 'Some title', content: 'Some content' });

    const response = await getPost(server, 1);

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      status: 'success',
      data: { post: { id: 1, title: 'Some title', content: 'Some content', publishedAt: null } },
    });
  });

  it('should not get a specific post if post does not exist', async () => {
    const response = await getPost(server, 1);

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(404);
    expect(response.body).toMatchObject({ status: 'fail', data: { message: 'Post not found' } });
  });

  it('should get all posts', async () => {
    const response = await getPosts(server);

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({ status: 'success', data: { posts: [] } });
  });

  it('should update a post', async () => {
    const userResponse = await initializeUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });
    await createPost(server, userResponse.body.data.accessToken, { title: 'Some title', content: 'Some content' });

    const response = await updatePost(server, userResponse.body.data.accessToken, 1, {
      title: 'Some updated title',
      content: 'Some updated content',
    });

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      status: 'success',
      data: { post: { id: 1, title: 'Some updated title', content: 'Some updated content', publishedAt: null } },
    });
  });

  it('should not update a post if not authenticated', async () => {
    const userResponse = await initializeUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });
    await createPost(server, userResponse.body.data.accessToken, { title: 'Some title', content: 'Some content' });

    const response = await updatePost(server, 'invalid access token', 1, {
      title: 'Some updated title',
      content: 'Some updated content',
    });

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(401);
    expect(response.body).toMatchObject({ status: 'error', message: 'Not authorized' });
  });

  it('should not update a post if not the owner', async () => {
    const firstUserResponse = await initializeUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });
    const secondUserResponse = await initializeUser(server, { name: 'Jane', email: 'jane@doe.com', password: 'pw' });
    const postResponse = await createPost(server, firstUserResponse.body.data.accessToken, {
      title: 'Some title',
      content: 'Some content',
    });

    const response = await updatePost(
      server,
      secondUserResponse.body.data.accessToken,
      postResponse.body.data.post.id,
      { title: 'Some updated title', content: 'Some updated content' },
    );

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(401);
    expect(response.body).toMatchObject({ status: 'error', message: 'Not authorized' });
  });

  it('should not update a post if post does not exist', async () => {
    const userResponse = await initializeUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });
    await createPost(server, userResponse.body.data.accessToken, { title: 'Some title', content: 'Some content' });

    const response = await updatePost(server, userResponse.body.data.accessToken, 2, {
      title: 'Some updated title',
      content: 'Some updated content',
    });

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(404);
    expect(response.body).toMatchObject({ status: 'fail', data: { message: 'Post not found' } });
  });

  it('should delete a post', async () => {
    const userResponse = await initializeUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });
    const postResponse = await createPost(server, userResponse.body.data.accessToken, {
      title: 'Some title',
      content: 'Some content',
    });

    const response = await deletePost(server, userResponse.body.data.accessToken, postResponse.body.data.post.id);

    expect(response.headers['content-type']).toBe(undefined);
    expect(response.statusCode).toBe(204);
  });

  it('should not delete a post if not authenticated', async () => {
    const userResponse = await initializeUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });
    const postResponse = await createPost(server, userResponse.body.data.accessToken, {
      title: 'Some title',
      content: 'Some content',
    });

    const response = await deletePost(server, 'invalid access token', postResponse.body.data.post.id);

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(401);
    expect(response.body).toMatchObject({ status: 'error', message: 'Not authorized' });
  });

  it('should not delete a post if not the owner', async () => {
    const firstUserResponse = await initializeUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });
    const secondUserResponse = await initializeUser(server, { name: 'Jane', email: 'jane@doe.com', password: 'pw' });
    const postResponse = await createPost(server, firstUserResponse.body.data.accessToken, {
      title: 'Some title',
      content: 'Some content',
    });

    const response = await deletePost(server, secondUserResponse.body.data.accessToken, postResponse.body.data.post.id);

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(401);
    expect(response.body).toMatchObject({ status: 'error', message: 'Not authorized' });
  });

  it('should not delete a post if post does not exist', async () => {
    const userResponse = await initializeUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });
    await createPost(server, userResponse.body.data.accessToken, { title: 'Some title', content: 'Some content' });

    const response = await deletePost(server, userResponse.body.data.accessToken, 2);

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(404);
    expect(response.body).toMatchObject({ status: 'fail', data: { message: 'Post not found' } });
  });

  it('should publish a post', async () => {
    const userResponse = await initializeUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });
    const postResponse = await createPost(server, userResponse.body.data.accessToken, {
      title: 'Some title',
      content: 'Some content',
    });

    const response = await publishPost(server, userResponse.body.data.accessToken, {
      id: postResponse.body.data.post.id,
    });

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(200);
    expect(response.body.data.post.publishedAt).not.toBe(null);
  });

  it('should not publish a post if not authenticated', async () => {
    const userResponse = await initializeUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });
    const postResponse = await createPost(server, userResponse.body.data.accessToken, {
      title: 'Some title',
      content: 'Some content',
    });

    const response = await publishPost(server, 'invalid access token', { id: postResponse.body.data.post.id });

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(401);
    expect(response.body).toMatchObject({ status: 'error', message: 'Not authorized' });
  });

  it('should not publish a post if not the owner', async () => {
    const firstUserResponse = await initializeUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });
    const secondUserResponse = await initializeUser(server, { name: 'Jane', email: 'jane@doe.com', password: 'pw' });
    const postResponse = await createPost(server, firstUserResponse.body.data.accessToken, {
      title: 'Some title',
      content: 'Some content',
    });

    const response = await publishPost(server, secondUserResponse.body.data.accessToken, {
      id: postResponse.body.data.post.id,
    });

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(401);
    expect(response.body).toMatchObject({ status: 'error', message: 'Not authorized' });
  });

  it('should not publish a post if post does not exist', async () => {
    const userResponse = await initializeUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });
    await createPost(server, userResponse.body.data.accessToken, { title: 'Some title', content: 'Some content' });

    const response = await publishPost(server, userResponse.body.data.accessToken, { id: 2 });

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(404);
    expect(response.body).toMatchObject({ status: 'fail', data: { message: 'Post not found' } });
  });

  it('should unpublish a post', async () => {
    const userResponse = await initializeUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });
    const postResponse = await createPost(server, userResponse.body.data.accessToken, {
      title: 'Some title',
      content: 'Some content',
    });
    await publishPost(server, userResponse.body.data.accessToken, { id: postResponse.body.data.post.id });

    const response = await unpublishPost(server, userResponse.body.data.accessToken, postResponse.body.data.post.id);

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(200);
    expect(response.body.data.post.publishedAt).toBe(null);
  });

  it('should not unpublish a post if not authenticated', async () => {
    const userResponse = await initializeUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });
    const postResponse = await createPost(server, userResponse.body.data.accessToken, {
      title: 'Some title',
      content: 'Some content',
    });
    await publishPost(server, userResponse.body.data.accessToken, { id: postResponse.body.data.post.id });

    const response = await unpublishPost(server, 'invalid access token', postResponse.body.data.post.id);

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(401);
    expect(response.body).toMatchObject({ status: 'error', message: 'Not authorized' });
  });

  it('should not unpublish a post if not the owner', async () => {
    const firstUserResponse = await initializeUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });
    const secondUserResponse = await initializeUser(server, { name: 'Jane', email: 'jane@doe.com', password: 'pw' });
    const postResponse = await createPost(server, firstUserResponse.body.data.accessToken, {
      title: 'Some title',
      content: 'Some content',
    });
    await publishPost(server, firstUserResponse.body.data.accessToken, { id: postResponse.body.data.post.id });

    const response = await unpublishPost(
      server,
      secondUserResponse.body.data.accessToken,
      postResponse.body.data.post.id,
    );

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(401);
    expect(response.body).toMatchObject({ status: 'error', message: 'Not authorized' });
  });

  it('should not unpublish a post if post does not exist', async () => {
    const userResponse = await initializeUser(server, { name: 'John', email: 'john@doe.com', password: 'pw' });
    const postResponse = await createPost(server, userResponse.body.data.accessToken, {
      title: 'Some title',
      content: 'Some content',
    });
    await publishPost(server, userResponse.body.data.accessToken, { id: postResponse.body.data.post.id });

    const response = await unpublishPost(server, userResponse.body.data.accessToken, 2);

    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(404);
    expect(response.body).toMatchObject({ status: 'fail', data: { message: 'Post not found' } });
  });
});
