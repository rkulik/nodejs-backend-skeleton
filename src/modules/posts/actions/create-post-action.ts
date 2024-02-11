import { CreatePostDto, Post } from '@modules/posts/schemas/base';
import { posts } from '@modules/posts/schemas/database';
import { Action, Database } from '@src/types';

export class CreatePostAction implements Action<Post> {
  public constructor(private database: Database) {}

  public execute(createPostDto: CreatePostDto): Post {
    return this.database
      .insert(posts)
      .values({
        ...createPostDto,
        createdAt: new Date(),
      })
      .returning()
      .get();
  }
}
