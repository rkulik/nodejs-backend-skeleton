import { Action } from '@app/types';
import { posts } from '@modules/posts/mocks/posts';
import { Post } from '@modules/posts/types';

export class ReadPostAction implements Action<Post | undefined> {
  public execute(id: number): Post | undefined {
    return posts.find((post) => {
      return post.id === id;
    });
  }
}
