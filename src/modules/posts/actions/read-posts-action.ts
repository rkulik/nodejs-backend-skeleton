import { Action, Database } from '@app/types';
import { Post, posts } from '@modules/posts/schemas';

export class ReadPostsAction implements Action<Post[]> {
  public constructor(private database: Database) {}

  public execute(): Post[] {
    return this.database.select().from(posts).all();
  }
}
