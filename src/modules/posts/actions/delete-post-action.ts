import { posts } from '@modules/posts/schemas';
import { Action, Database } from '@src/types';
import { eq } from 'drizzle-orm';

export class DeletePostAction implements Action<boolean> {
  public constructor(private database: Database) {}

  public execute(id: number): boolean {
    return !!this.database.delete(posts).where(eq(posts.id, id)).returning().get();
  }
}
