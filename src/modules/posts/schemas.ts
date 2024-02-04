import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
});

export type Post = InferSelectModel<typeof posts>;

export type CreatePostDto = Omit<InferInsertModel<typeof posts>, 'id'>;

export type UpdatePostDto = Omit<InferInsertModel<typeof posts>, 'id'>;
