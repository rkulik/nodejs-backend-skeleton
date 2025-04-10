import type { Comment } from '@app/modules/comments/schemas/base';
import { comments } from '@app/modules/comments/schemas/database';
import type { Action, Database } from '@app/types';
import { eq } from 'drizzle-orm';

export class ReadCommentAction implements Action<Comment | undefined> {
  public constructor(private database: Database) {}

  public execute(id: number): Comment | undefined {
    return this.database.select().from(comments).where(eq(comments.id, id)).get();
  }
}
