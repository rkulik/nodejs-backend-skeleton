import { Comment, UpdateCommentDto } from '@modules/comments/schemas/base';
import { comments } from '@modules/comments/schemas/database';
import { Action, Database } from '@src/types';
import { eq } from 'drizzle-orm';

export class UpdateCommentAction implements Action<Comment> {
  public constructor(private database: Database) {}

  public execute(comment: Comment, updateCommentDto: UpdateCommentDto): Comment {
    return this.database
      .update(comments)
      .set({
        ...updateCommentDto,
        updatedAt: new Date(),
      })
      .where(eq(comments.id, comment.id))
      .returning()
      .get();
  }
}
