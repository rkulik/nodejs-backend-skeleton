import type { Comment } from '@modules/comments/schemas/base';
import type { Factory } from '@src/factory';

export class PostCommentsController {
  public constructor(private factory: Factory) {}

  public readAll(postId: number): Comment[] | undefined {
    return this.factory.createReadPostCommentsAction().execute(postId);
  }
}
