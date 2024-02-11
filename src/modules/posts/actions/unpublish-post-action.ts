import { Post } from '@modules/posts/schemas/base';
import { posts } from '@modules/posts/schemas/database';
import { Action, Database } from '@src/types';
import { eq } from 'drizzle-orm';

export class UnpublishPostAction implements Action<Post> {
  public constructor(private database: Database) {}

  public execute(post: Post): Post {
    return this.database.update(posts).set({ publishedAt: null }).where(eq(posts.id, post.id)).returning().get();
  }
}
