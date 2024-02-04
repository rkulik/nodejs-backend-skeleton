import { Post, posts } from '@modules/posts/schemas';
import { Action, Database } from '@src/types';

export class ReadPostsAction implements Action<Post[]> {
  public constructor(private database: Database) {}

  public execute(): Post[] {
    return this.database.select().from(posts).all();
  }
}
