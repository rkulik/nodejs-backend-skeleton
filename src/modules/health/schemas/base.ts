export const getHealthSchema = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          data: {
            type: 'object',
            properties: {
              status: { type: 'string' },
            },
            required: ['status'],
            additionalProperties: false,
          },
        },
        required: ['status', 'data'],
        additionalProperties: false,
      },
    },
  },
} as const;
