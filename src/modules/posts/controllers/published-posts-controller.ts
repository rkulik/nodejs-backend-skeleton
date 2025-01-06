import type { Post, PublishPostDto } from '@modules/posts/schemas/base';
import type { Factory } from '@src/factory';

export class PublishedPostsController {
  public constructor(private factory: Factory) {}

  public create(publishPostDto: PublishPostDto): Post | undefined {
    return this.factory.createPublishPostAction().execute(publishPostDto.id);
  }

  public delete(id: number): Post | undefined {
    return this.factory.createUnpublishPostAction().execute(id);
  }
}
