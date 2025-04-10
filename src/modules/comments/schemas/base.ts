import type { comments } from '@app/modules/comments/schemas/database';
import { headersSchema, notFoundSchema, unauthorizedSchema } from '@app/schemas';
import type { InferSelectModel } from 'drizzle-orm';
import type { FromSchema } from 'json-schema-to-ts';

export type Comment = InferSelectModel<typeof comments>;

const commentSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    postId: { type: 'number' },
    content: { type: 'string' },
    createdAt: { type: 'number' },
    updatedAt: { type: 'number', nullable: true },
  },
  required: ['id', 'postId', 'content', 'createdAt', 'updatedAt'],
  additionalProperties: false,
};

export const createPostCommentSchema = {
  schema: {
    headers: headersSchema,
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' },
      },
      required: ['id'],
      additionalProperties: false,
    },
    body: {
      type: 'object',
      properties: {
        content: { type: 'string' },
      },
      required: ['content'],
      additionalProperties: false,
    },
    response: {
      201: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          data: commentSchema,
        },
        required: ['status', 'data'],
        additionalProperties: false,
      },
      404: notFoundSchema,
      401: unauthorizedSchema,
    },
  },
} as const;

export type CreatePostCommentDto = FromSchema<typeof createPostCommentSchema.schema.body>;

export const getPostCommentsSchema = {
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' },
      },
      required: ['id'],
      additionalProperties: false,
    },
    response: {
      200: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          data: {
            type: 'array',
            items: commentSchema,
          },
        },
        required: ['status', 'data'],
        additionalProperties: false,
      },
      404: notFoundSchema,
    },
  },
} as const;

export const getCommentSchema = {
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' },
      },
      required: ['id'],
      additionalProperties: false,
    },
    response: {
      200: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          data: commentSchema,
        },
        required: ['status', 'data'],
        additionalProperties: false,
      },
      404: notFoundSchema,
    },
  },
} as const;

export const updateCommentSchema = {
  schema: {
    headers: headersSchema,
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' },
      },
      required: ['id'],
      additionalProperties: false,
    },
    body: {
      type: 'object',
      properties: {
        content: { type: 'string' },
      },
      required: ['content'],
      additionalProperties: false,
    },
    response: {
      200: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          data: commentSchema,
        },
        required: ['status', 'data'],
        additionalProperties: false,
      },
      404: notFoundSchema,
      401: unauthorizedSchema,
    },
  },
} as const;

export type UpdateCommentDto = FromSchema<typeof updateCommentSchema.schema.body>;

export const deleteCommentSchema = {
  schema: {
    headers: headersSchema,
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' },
      },
      required: ['id'],
      additionalProperties: false,
    },
    response: {
      204: { type: 'null' },
      404: notFoundSchema,
      401: unauthorizedSchema,
    },
  },
} as const;
