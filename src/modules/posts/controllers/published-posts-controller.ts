import type { Factory } from '@app/factory';
import type { Post, PublishPostDto } from '@app/modules/posts/schemas/base';

export class PublishedPostsController {
  public constructor(private factory: Factory) {}

  public create(publishPostDto: PublishPostDto): Post | undefined {
    return this.factory.createPublishPostAction().execute(publishPostDto.id);
  }

  public delete(id: number): Post | undefined {
    return this.factory.createUnpublishPostAction().execute(id);
  }
}
