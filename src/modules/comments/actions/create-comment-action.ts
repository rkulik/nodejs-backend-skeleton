import { Comment, CreateCommentDto } from '@modules/comments/schemas/base';
import { comments } from '@modules/comments/schemas/database';
import { Action, Database } from '@src/types';

export class CreateCommentAction implements Action<Comment> {
  public constructor(private database: Database) {}

  public execute(createCommentDto: CreateCommentDto): Comment {
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
