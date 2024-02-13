import { Comment } from '@modules/comments/schemas/base';
import { Factory } from '@src/factory';

export class PostCommentsController {
  public constructor(private factory: Factory) {}

  public read(id: number): Comment[] | undefined {
    const existingPost = this.factory.createReadPostAction().execute(id);
    if (!existingPost) {
      return undefined;
    }

    return this.factory.createReadPostCommentsAction().execute(id);
  }
}
