import { comments } from '@modules/comments/schemas/database';
import type { Action, Database } from '@src/types';
import { eq } from 'drizzle-orm';

export class DeleteCommentAction implements Action<boolean> {
  public constructor(private database: Database) {}

  public execute(id: number): boolean {
    return !!this.database.delete(comments).where(eq(comments.id, id)).returning().get();
  }
}
