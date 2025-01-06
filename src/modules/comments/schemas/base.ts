import type { comments } from '@modules/comments/schemas/database';
import { headersSchema, notFoundSchema, unauthorizedSchema } from '@src/schemas';
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

export const createCommentSchema = {
  schema: {
    headers: headersSchema,
    body: {
      type: 'object',
      properties: {
        postId: { type: 'number' },
        content: { type: 'string' },
      },
      required: ['postId', 'content'],
      additionalProperties: false,
    },
    response: {
      201: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          data: {
            type: 'object',
            properties: {
              comment: commentSchema,
            },
            required: ['comment'],
            additionalProperties: false,
          },
        },
        required: ['status', 'data'],
        additionalProperties: false,
      },
      404: notFoundSchema,
      401: unauthorizedSchema,
    },
  },
} as const;

export type CreateCommentDto = FromSchema<typeof createCommentSchema.schema.body>;

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
            type: 'object',
            properties: {
              comments: {
                type: 'array',
                items: commentSchema,
              },
            },
            required: ['comments'],
            additionalProperties: false,
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
          data: {
            type: 'object',
            properties: {
              comment: commentSchema,
            },
            required: ['comment'],
            additionalProperties: false,
          },
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
          data: {
            type: 'object',
            properties: {
              comment: commentSchema,
            },
            required: ['comment'],
            additionalProperties: false,
          },
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
