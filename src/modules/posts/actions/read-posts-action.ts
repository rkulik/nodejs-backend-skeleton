import { Action } from '@app/types';
import { posts } from '@modules/posts/mocks/posts';
import { Post } from '@modules/posts/types';

export class ReadPostsAction implements Action<Post[]> {
  public execute(): Post[] {
    return posts;
  }
}
