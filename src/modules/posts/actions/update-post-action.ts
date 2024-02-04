import { Action, Database } from '@app/types';
import { Post, UpdatePostDto, posts } from '@modules/posts/schemas';
import { eq } from 'drizzle-orm';

export class UpdatePostAction implements Action<Post> {
  public constructor(private database: Database) {}

  public execute(post: Post, updatePostDto: UpdatePostDto): Post {
    return this.database.update(posts).set(updatePostDto).where(eq(posts.id, post.id)).returning().get();
  }
}
