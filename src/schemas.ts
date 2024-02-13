export const notFoundSchema = {
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
};
