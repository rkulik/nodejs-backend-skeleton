import type { Comment, CreatePostCommentDto } from '@app/modules/comments/schemas/base';
import { comments } from '@app/modules/comments/schemas/database';
import type { ReadPostAction } from '@app/modules/posts/actions/read-post-action';
import type { Action, Database } from '@app/types';

export class CreatePostCommentAction implements Action<Comment | undefined> {
  public constructor(
    private database: Database,
    private readPostAction: ReadPostAction,
  ) {}

  public execute(postId: number, createCommentDto: CreatePostCommentDto, userId: number): Comment | undefined {
    const existingPost = this.readPostAction.execute(postId);
    if (!existingPost) {
      return undefined;
    }

    return this.database
      .insert(comments)
      .values({
        postId,
        ...createCommentDto,
        userId,
        createdAt: new Date(),
      })
      .returning()
      .get();
  }
}
