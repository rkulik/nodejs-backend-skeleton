import type { Factory } from '@app/factory';
import type { CreatePostDto, Post, UpdatePostDto } from '@app/modules/posts/schemas/base';

export class PostsController {
  public constructor(private factory: Factory) {}

  public create(createPostDto: CreatePostDto, userId: number): Post {
    return this.factory.createCreatePostAction().execute(createPostDto, userId);
  }

  public read(id: number): Post | undefined {
    return this.factory.createReadPostAction().execute(id);
  }

  public readAll(): Post[] {
    return this.factory.createReadPostsAction().execute();
  }

  public update(id: number, updatePostDto: UpdatePostDto): Post | undefined {
    return this.factory.createUpdatePostAction().execute(id, updatePostDto);
  }

  public delete(id: number): boolean {
    return this.factory.createDeletePostAction().execute(id);
  }
}
