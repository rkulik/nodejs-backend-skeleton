import { Comment } from '@modules/comments/schemas/base';
import { comments } from '@modules/comments/schemas/database';
import { Action, Database } from '@src/types';
import { eq } from 'drizzle-orm';

export class ReadCommentAction implements Action<Comment | undefined> {
  public constructor(private database: Database) {}

  public execute(id: number): Comment | undefined {
    return this.database.select().from(comments).where(eq(comments.id, id)).get();
  }
}
