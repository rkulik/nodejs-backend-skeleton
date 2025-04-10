import { users } from '@app/modules/auth/schemas/database';
import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey(),
  userId: integer('user_id')
    .references(
      () => {
        return users.id;
      },
      { onDelete: 'cascade' },
    )
    .notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  publishedAt: integer('published_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }),
});
