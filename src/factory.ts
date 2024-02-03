import { PostsController } from './modules/posts/controllers/posts-controller';

export class Factory {
  public createPostsController(): PostsController {
    return new PostsController();
  }
}
