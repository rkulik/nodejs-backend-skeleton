import { Comment, CreateCommentDto, UpdateCommentDto } from '@modules/comments/schemas/base';
import { Factory } from '@src/factory';

export class CommentsController {
  public constructor(private factory: Factory) {}

  public create(createCommentDto: CreateCommentDto): Comment | undefined {
    const existingPost = this.factory.createReadPostAction().execute(createCommentDto.postId);
    if (!existingPost) {
      return undefined;
    }

    return this.factory.createCreateCommentAction().execute(createCommentDto);
  }

  public readOne(id: number): Comment | undefined {
    return this.factory.createReadCommentAction().execute(id);
  }

  public update(id: number, updateCommentDto: UpdateCommentDto): Comment | undefined {
    const existingComment = this.factory.createReadCommentAction().execute(id);
    if (!existingComment) {
      return undefined;
    }

    return this.factory.createUpdateCommentAction().execute(existingComment, updateCommentDto);
  }

  public delete(id: number): boolean {
    return this.factory.createDeleteCommentAction().execute(id);
  }
}
