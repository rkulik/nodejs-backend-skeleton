import { Post, PublishPostDto } from '@modules/posts/schemas/base';
import { Factory } from '@src/factory';

export class PublishedPostsController {
  public constructor(private factory: Factory) {}

  public create(publishPostDto: PublishPostDto): Post | undefined {
    const existingPost = this.factory.createReadPostAction().execute(publishPostDto.id);
    if (!existingPost) {
      return undefined;
    }

    return this.factory.createPublishPostAction().execute(existingPost);
  }

  public delete(id: number): Post | undefined {
    const existingPost = this.factory.createReadPostAction().execute(id);
    if (!existingPost) {
      return undefined;
    }

    return this.factory.createUnpublishPostAction().execute(existingPost);
  }
}
