import { ReadCommentAction } from '@modules/comments/actions/read-comment-action';
import { Comment, UpdateCommentDto } from '@modules/comments/schemas/base';
import { comments } from '@modules/comments/schemas/database';
import { Action, Database } from '@src/types';
import { eq } from 'drizzle-orm';

export class UpdateCommentAction implements Action<Comment | undefined> {
  public constructor(
    private database: Database,
    private readCommentAction: ReadCommentAction,
  ) {}

  public execute(id: number, updateCommentDto: UpdateCommentDto): Comment | undefined {
    const existingComment = this.readCommentAction.execute(id);
    if (!existingComment) {
      return undefined;
    }

    return this.database
      .update(comments)
      .set({
        ...updateCommentDto,
        updatedAt: new Date(),
      })
      .where(eq(comments.id, existingComment.id))
      .returning()
      .get();
  }
}
