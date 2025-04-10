import type { Post } from '@app/modules/posts/schemas/base';
import { posts } from '@app/modules/posts/schemas/database';
import type { Action, Database } from '@app/types';
import { eq } from 'drizzle-orm';

export class ReadPostAction implements Action<Post | undefined> {
  public constructor(private database: Database) {}

  public execute(id: number): Post | undefined {
    return this.database.select().from(posts).where(eq(posts.id, id)).get();
  }
}
