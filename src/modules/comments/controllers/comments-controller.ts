import type { Factory } from '@app/factory';
import type { Comment, CreateCommentDto, UpdateCommentDto } from '@app/modules/comments/schemas/base';

export class CommentsController {
  public constructor(private factory: Factory) {}

  public create(createCommentDto: CreateCommentDto, userId: number): Comment | undefined {
    return this.factory.createCreateCommentAction().execute(createCommentDto, userId);
  }

  public read(id: number): Comment | undefined {
    return this.factory.createReadCommentAction().execute(id);
  }

  public update(id: number, updateCommentDto: UpdateCommentDto): Comment | undefined {
    return this.factory.createUpdateCommentAction().execute(id, updateCommentDto);
  }

  public delete(id: number): boolean {
    return this.factory.createDeleteCommentAction().execute(id);
  }
}
