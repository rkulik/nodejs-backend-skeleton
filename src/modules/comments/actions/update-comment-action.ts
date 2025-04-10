import type { ReadCommentAction } from '@app/modules/comments/actions/read-comment-action';
import type { Comment, UpdateCommentDto } from '@app/modules/comments/schemas/base';
import { comments } from '@app/modules/comments/schemas/database';
import type { Action, Database } from '@app/types';
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
