import type { ReadPostAction } from '@modules/posts/actions/read-post-action';
import type { Post } from '@modules/posts/schemas/base';
import { posts } from '@modules/posts/schemas/database';
import type { Action, Database } from '@src/types';
import { eq } from 'drizzle-orm';

export class UnpublishPostAction implements Action<Post | undefined> {
  public constructor(
    private database: Database,
    private readPostAction: ReadPostAction,
  ) {}

  public execute(id: number): Post | undefined {
    const existingPost = this.readPostAction.execute(id);
    if (!existingPost) {
      return undefined;
    }

    return this.database
      .update(posts)
      .set({ publishedAt: null })
      .where(eq(posts.id, existingPost.id))
      .returning()
      .get();
  }
}
