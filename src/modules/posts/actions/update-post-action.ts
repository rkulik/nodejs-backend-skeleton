import { ReadPostAction } from '@modules/posts/actions/read-post-action';
import { Post, UpdatePostDto } from '@modules/posts/schemas/base';
import { posts } from '@modules/posts/schemas/database';
import { Action, Database } from '@src/types';
import { eq } from 'drizzle-orm';

export class UpdatePostAction implements Action<Post | undefined> {
  public constructor(
    private database: Database,
    private readPostAction: ReadPostAction,
  ) {}

  public execute(id: number, updatePostDto: UpdatePostDto): Post | undefined {
    const existingPost = this.readPostAction.execute(id);
    if (!existingPost) {
      return undefined;
    }

    return this.database
      .update(posts)
      .set({
        ...updatePostDto,
        updatedAt: new Date(),
      })
      .where(eq(posts.id, existingPost.id))
      .returning()
      .get();
  }
}
