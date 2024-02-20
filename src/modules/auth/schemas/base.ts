import { users } from '@modules/auth/schemas/database';
import { badRequestSchema } from '@src/schemas';
import { InferSelectModel } from 'drizzle-orm';
import { FromSchema } from 'json-schema-to-ts';

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
      200: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          data: {
            type: 'object',
            properties: {
              user: {
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
            required: ['user'],
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
