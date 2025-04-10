import type { Factory } from '@app/factory';
import type { Comment } from '@app/modules/comments/schemas/base';

export class PostCommentsController {
  public constructor(private factory: Factory) {}

  public readAll(postId: number): Comment[] | undefined {
    return this.factory.createReadPostCommentsAction().execute(postId);
  }
}
