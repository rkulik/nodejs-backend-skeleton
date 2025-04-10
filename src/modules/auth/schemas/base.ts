import type { users } from '@app/modules/auth/schemas/database';
import { badRequestSchema, unauthorizedSchema } from '@app/schemas';
import type { InferSelectModel } from 'drizzle-orm';
import type { FromSchema } from 'json-schema-to-ts';

export type User = InferSelectModel<typeof users>;

export const registerUserSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['name', 'email', 'password'],
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
              id: { type: 'number' },
              name: { type: 'string' },
              createdAt: { type: 'number' },
              updatedAt: { type: 'number', nullable: true },
            },
            required: ['id', 'name', 'createdAt', 'updatedAt'],
            additionalProperties: false,
          },
        },
        required: ['status', 'data'],
        additionalProperties: false,
      },
      400: badRequestSchema,
    },
  },
} as const;

export type RegisterUserDto = FromSchema<typeof registerUserSchema.schema.body>;

export const loginUserSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['email', 'password'],
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
              accessToken: { type: 'string' },
            },
            required: ['accessToken'],
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

export type LoginUserDto = FromSchema<typeof loginUserSchema.schema.body>;
