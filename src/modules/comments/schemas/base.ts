import { comments } from '@modules/comments/schemas/database';
import { InferSelectModel } from 'drizzle-orm';
import { FromSchema } from 'json-schema-to-ts';

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
      404: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          data: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
            required: ['message'],
            additionalProperties: false,
          },
        },
        required: ['status', 'data'],
        additionalProperties: false,
      },
    },
  },
} as const;

export type CreateCommentDto = FromSchema<typeof createCommentSchema.schema.body>;

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
      404: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          data: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
            required: ['message'],
            additionalProperties: false,
          },
        },
        required: ['status', 'data'],
        additionalProperties: false,
      },
    },
  },
} as const;

export const updateCommentSchema = {
  schema: {
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
      404: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          data: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
            required: ['message'],
            additionalProperties: false,
          },
        },
        required: ['status', 'data'],
        additionalProperties: false,
      },
    },
  },
} as const;

export type UpdateCommentDto = FromSchema<typeof updateCommentSchema.schema.body>;

export const deleteCommentSchema = {
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
      204: { type: 'null' },
      404: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          data: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
            required: ['message'],
            additionalProperties: false,
          },
        },
        required: ['status', 'data'],
        additionalProperties: false,
      },
    },
  },
} as const;
