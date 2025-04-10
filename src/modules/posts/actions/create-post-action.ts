import type { CreatePostDto, Post } from '@app/modules/posts/schemas/base';
import { posts } from '@app/modules/posts/schemas/database';
import type { Action, Database } from '@app/types';

export class CreatePostAction implements Action<Post> {
  public constructor(private database: Database) {}

  public execute(createPostDto: CreatePostDto, userId: number): Post {
    return this.database
      .insert(posts)
      .values({
        ...createPostDto,
        userId,
        createdAt: new Date(),
      })
      .returning()
      .get();
  }
}
