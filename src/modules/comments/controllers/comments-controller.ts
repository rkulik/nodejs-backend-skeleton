import { Comment, CreateCommentDto, UpdateCommentDto } from '@modules/comments/schemas/base';
import { Factory } from '@src/factory';

export class CommentsController {
  public constructor(private factory: Factory) {}

  public create(createCommentDto: CreateCommentDto): Comment | undefined {
    return this.factory.createCreateCommentAction().execute(createCommentDto);
  }

  public readOne(id: number): Comment | undefined {
    return this.factory.createReadCommentAction().execute(id);
  }

  public update(id: number, updateCommentDto: UpdateCommentDto): Comment | undefined {
    return this.factory.createUpdateCommentAction().execute(id, updateCommentDto);
  }

  public delete(id: number): boolean {
    return this.factory.createDeleteCommentAction().execute(id);
  }
}
