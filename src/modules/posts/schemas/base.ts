import { posts } from '@modules/posts/schemas/database';
import { InferSelectModel } from 'drizzle-orm';
import { FromSchema } from 'json-schema-to-ts';

export type Post = InferSelectModel<typeof posts>;

export const createPostSchema = {
  schema: {
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
              post: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  title: { type: 'string' },
                  content: { type: 'string' },
                },
                required: ['id', 'title', 'content'],
                additionalProperties: false,
              },
            },
            required: ['post'],
            additionalProperties: false,
          },
        },
        required: ['status', 'data'],
        additionalProperties: false,
      },
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
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    title: { type: 'string' },
                    content: { type: 'string' },
                  },
                  required: ['id', 'title', 'content'],
                  additionalProperties: false,
                },
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
        id: { type: 'string' },
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
              post: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  title: { type: 'string' },
                  content: { type: 'string' },
                },
                required: ['id', 'title', 'content'],
                additionalProperties: false,
              },
            },
            required: ['post'],
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

export const updatePostSchema = {
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' },
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
              post: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  title: { type: 'string' },
                  content: { type: 'string' },
                },
                required: ['id', 'title', 'content'],
                additionalProperties: false,
              },
            },
            required: ['post'],
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

export type UpdatePostDto = FromSchema<typeof updatePostSchema.schema.body>;

export const deletePostSchema = {
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' },
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
