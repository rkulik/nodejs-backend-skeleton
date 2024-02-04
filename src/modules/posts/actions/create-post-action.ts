import { Action, Database } from '@app/types';
import { CreatePostDto, Post, posts } from '@modules/posts/schemas';

export class CreatePostAction implements Action<Post> {
  public constructor(private database: Database) {}

  public execute(createPostDto: CreatePostDto): Post {
    return this.database.insert(posts).values(createPostDto).returning().get();
  }
}
