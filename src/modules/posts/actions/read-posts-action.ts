import { Post } from '@modules/posts/schemas/base';
import { posts } from '@modules/posts/schemas/database';
import { Action, Database } from '@src/types';

export class ReadPostsAction implements Action<Post[]> {
  public constructor(private database: Database) {}

  public execute(): Post[] {
    return this.database.select().from(posts).all();
  }
}
