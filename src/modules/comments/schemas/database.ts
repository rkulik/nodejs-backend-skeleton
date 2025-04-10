import { users } from '@app/modules/auth/schemas/database';
import { posts } from '@app/modules/posts/schemas/database';
import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const comments = sqliteTable('comments', {
  id: integer('id').primaryKey(),
  postId: integer('post_id')
    .references(
      () => {
        return posts.id;
      },
      { onDelete: 'cascade' },
    )
    .notNull(),
  userId: integer('user_id')
    .references(
      () => {
        return users.id;
      },
      { onDelete: 'cascade' },
    )
    .notNull(),
  content: text('content').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }),
});
