import { CreatePostDto, Post, posts } from '@modules/posts/schemas';
import { Action, Database } from '@src/types';

export class CreatePostAction implements Action<Post> {
  public constructor(private database: Database) {}

  public execute(createPostDto: CreatePostDto): Post {
    return this.database.insert(posts).values(createPostDto).returning().get();
  }
}
