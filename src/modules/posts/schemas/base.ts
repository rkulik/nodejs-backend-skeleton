import type { posts } from '@modules/posts/schemas/database';
import { headersSchema, notFoundSchema, unauthorizedSchema } from '@src/schemas';
import type { InferSelectModel } from 'drizzle-orm';
import type { FromSchema } from 'json-schema-to-ts';

export type Post = InferSelectModel<typeof posts>;

const postSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    title: { type: 'string' },
    content: { type: 'string' },
    publishedAt: { type: 'number', nullable: true },
    createdAt: { type: 'number' },
    updatedAt: { type: 'number', nullable: true },
  },
  required: ['id', 'title', 'content', 'publishedAt', 'createdAt', 'updatedAt'],
  additionalProperties: false,
};

export const createPostSchema = {
  schema: {
    headers: headersSchema,
    body: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        content: { type: 'string' },
      },
      required: ['title', 'content'],
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
              post: postSchema,
            },
            required: ['post'],
            additionalProperties: false,
          },
        },
        required: ['status', 'data'],
        additionalProperties: false,
      },
      401: unauthorizedSchema,
    },
  },
} as const;

export type CreatePostDto = FromSchema<typeof createPostSchema.schema.body>;

export const getPostsSchema = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          data: {
            type: 'object',
            properties: {
              posts: {
                type: 'array',
                items: postSchema,
              },
            },
            required: ['posts'],
            additionalProperties: false,
          },
        },
        required: ['status', 'data'],
        additionalProperties: false,
      },
    },
  },
} as const;

export const getPostSchema = {
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
              post: postSchema,
            },
            required: ['post'],
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

export const updatePostSchema = {
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
        title: { type: 'string' },
        content: { type: 'string' },
      },
      required: ['title', 'content'],
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
              post: postSchema,
            },
            required: ['post'],
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

export type UpdatePostDto = FromSchema<typeof updatePostSchema.schema.body>;

export const deletePostSchema = {
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

export const publishPostSchema = {
  schema: {
    headers: headersSchema,
    body: {
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
              post: postSchema,
            },
            required: ['post'],
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

export type PublishPostDto = FromSchema<typeof publishPostSchema.schema.body>;

export const unpublishPostSchema = {
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
      200: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          data: {
            type: 'object',
            properties: {
              post: postSchema,
            },
            required: ['post'],
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
