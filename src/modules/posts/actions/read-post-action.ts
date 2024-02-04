import { Action, Database } from '@app/types';
import { Post, posts } from '@modules/posts/schemas';
import { eq } from 'drizzle-orm';

export class ReadPostAction implements Action<Post | undefined> {
  public constructor(private database: Database) {}

  public execute(id: number): Post | undefined {
    return this.database.select().from(posts).where(eq(posts.id, id)).get();
  }
}
