import { Action } from '@app/types';
import { posts } from '@modules/posts/mocks/posts';

export class DeletePostAction implements Action<boolean> {
  public execute(id: number): boolean {
    return posts
      .map((post) => {
        return post.id;
      })
      .includes(id);
  }
}
