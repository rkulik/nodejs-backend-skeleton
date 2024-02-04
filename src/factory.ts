import { CreatePostAction } from '@modules/posts/actions/create-post-action';
import { DeletePostAction } from '@modules/posts/actions/delete-post-action';
import { ReadPostAction } from '@modules/posts/actions/read-post-action';
import { ReadPostsAction } from '@modules/posts/actions/read-posts-action';
import { UpdatePostAction } from '@modules/posts/actions/update-post-action';
import { PostsController } from '@modules/posts/controllers/posts-controller';

export class Factory {
  public createPostsController(): PostsController {
    return new PostsController(this);
  }

  public createReadPostsAction(): ReadPostsAction {
    return new ReadPostsAction();
  }

  public createReadPostAction(): ReadPostAction {
    return new ReadPostAction();
  }

  public createCreatePostAction(): CreatePostAction {
    return new CreatePostAction();
  }

  public createUpdatePostAction(): UpdatePostAction {
    return new UpdatePostAction();
  }

  public createDeletePostAction(): DeletePostAction {
    return new DeletePostAction();
  }
}
