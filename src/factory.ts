import { PostsController } from './controllers/posts-controller';

export class Factory {
  public createPostsController(): PostsController {
    return new PostsController();
  }
}
