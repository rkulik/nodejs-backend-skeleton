import { comments } from '@app/modules/comments/schemas/database';
import type { Action, Database } from '@app/types';
import { eq } from 'drizzle-orm';

export class DeleteCommentAction implements Action<boolean> {
  public constructor(private database: Database) {}

  public execute(id: number): boolean {
    return !!this.database.delete(comments).where(eq(comments.id, id)).returning().get();
  }
}
