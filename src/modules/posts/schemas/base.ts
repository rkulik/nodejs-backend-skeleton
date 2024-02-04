import { posts } from '@modules/posts/schemas/database';
import { InferSelectModel } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export type Post = InferSelectModel<typeof posts>;

export const createPostSchema = { body: createInsertSchema(posts).strict().omit({ id: true }).strict() };

export type CreatePostDto = z.infer<typeof createPostSchema.body>;

export const getPostSchema = { params: z.object({ id: z.string() }) };

export const updatePostSchema = {
  params: z.object({
    id: z.string(),
  }),
  body: createInsertSchema(posts).omit({ id: true }).strict(),
};

export type UpdatePostDto = z.infer<typeof updatePostSchema.body>;

export const deletePostSchema = { params: z.object({ id: z.string() }) };
