import { Comment, CreateCommentDto } from '@modules/comments/schemas/base';
import { comments } from '@modules/comments/schemas/database';
import { ReadPostAction } from '@modules/posts/actions/read-post-action';
import { Action, Database } from '@src/types';

export class CreateCommentAction implements Action<Comment | undefined> {
  public constructor(
    private database: Database,
    private readPostAction: ReadPostAction,
  ) {}

  public execute(createCommentDto: CreateCommentDto): Comment | undefined {
    const existingPost = this.readPostAction.execute(createCommentDto.postId);
    if (!existingPost) {
      return undefined;
    }

    return this.database
      .insert(comments)
      .values({
        ...createCommentDto,
        createdAt: new Date(),
      })
      .returning()
      .get();
  }
}
