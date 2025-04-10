import type { Factory } from '@app/factory';
import type { Comment, CreatePostCommentDto } from '@app/modules/comments/schemas/base';

export class PostCommentsController {
  public constructor(private factory: Factory) {}

  public create(postId: number, createPostCommentDto: CreatePostCommentDto, userId: number): Comment | undefined {
    return this.factory.createCreatePostCommentAction().execute(postId, createPostCommentDto, userId);
  }

  public readAll(postId: number): Comment[] | undefined {
    return this.factory.createReadPostCommentsAction().execute(postId);
  }
}
