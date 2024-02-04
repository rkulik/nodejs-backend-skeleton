import { Post } from '@modules/posts/schemas/base';
import { posts } from '@modules/posts/schemas/database';
import { Action, Database } from '@src/types';
import { eq } from 'drizzle-orm';

export class ReadPostAction implements Action<Post | undefined> {
  public constructor(private database: Database) {}

  public execute(id: number): Post | undefined {
    return this.database.select().from(posts).where(eq(posts.id, id)).get();
  }
}
