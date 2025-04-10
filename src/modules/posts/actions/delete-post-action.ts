import { posts } from '@app/modules/posts/schemas/database';
import type { Action, Database } from '@app/types';
import { eq } from 'drizzle-orm';

export class DeletePostAction implements Action<boolean> {
  public constructor(private database: Database) {}

  public execute(id: number): boolean {
    return !!this.database.delete(posts).where(eq(posts.id, id)).returning().get();
  }
}
