import { Factory } from '@app/factory';
import { CreatePostDto, UpdatePostDto } from '@modules/posts/dtos';
import { Post } from '@modules/posts/types';

export class PostsController {
  public constructor(private factory: Factory) {}

  public create(createPostDto: CreatePostDto): Post {
    return this.factory.createCreatePostAction().execute(createPostDto);
  }

  public read(): Post[] {
    return this.factory.createReadPostsAction().execute();
  }

  public readOne(id: number): Post | undefined {
    return this.factory.createReadPostAction().execute(id);
  }

  public update(id: number, updatePostDto: UpdatePostDto): Post | undefined {
    const existingPost = this.factory.createReadPostAction().execute(id);
    if (!existingPost) {
      return undefined;
    }

    return this.factory.createUpdatePostAction().execute(existingPost, updatePostDto);
  }

  public delete(id: number): boolean {
    return this.factory.createDeletePostAction().execute(id);
  }
}
