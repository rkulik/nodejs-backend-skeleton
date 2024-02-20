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

export const badRequestSchema = {
  type: 'object',
  properties: {
    status: { type: 'string' },
    message: { type: 'string' },
    code: { type: 'number' },
    data: {
      type: 'object',
      properties: {},
      additionalProperties: true,
    },
  },
  required: ['status', 'message'],
  additionalProperties: false,
};

export const unauthorizedSchema = {
  type: 'object',
  properties: {
    status: { type: 'string' },
    message: { type: 'string' },
    code: { type: 'number' },
    data: {
      type: 'object',
      properties: {},
      additionalProperties: true,
    },
  },
  required: ['status', 'message'],
  additionalProperties: false,
};

export const headersSchema = {
  type: 'object',
  properties: {
    authorization: { type: 'string' },
  },
  required: ['authorization'],
  additionalProperties: true,
};
