import type { Post } from '@app/modules/posts/schemas/base';
import { posts } from '@app/modules/posts/schemas/database';
import type { Action, Database } from '@app/types';

export class ReadPostsAction implements Action<Post[]> {
  public constructor(private database: Database) {}

  public execute(): Post[] {
    return this.database.select().from(posts).all();
  }
}
