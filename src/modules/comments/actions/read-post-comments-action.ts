import type { Comment } from '@modules/comments/schemas/base';
import { comments } from '@modules/comments/schemas/database';
import type { ReadPostAction } from '@modules/posts/actions/read-post-action';
import type { Action, Database } from '@src/types';
import { eq } from 'drizzle-orm';

export class ReadPostCommentsAction implements Action<Comment[] | undefined> {
  public constructor(
    private database: Database,
    private readPostAction: ReadPostAction,
  ) {}

  public execute(postId: number): Comment[] | undefined {
    const existingPost = this.readPostAction.execute(postId);
    if (!existingPost) {
      return undefined;
    }

    return this.database.select().from(comments).where(eq(comments.postId, existingPost.id)).all();
  }
}
