import 'fastify';

declare module 'fastify' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface FastifyReply {
    sendSuccess: (data: Record<string, unknown> | null = null) => FastifyReply;
    sendFail: (data: Record<string, unknown>) => FastifyReply;
    sendError: (message: string, code?: number, data?: Record<string, unknown>) => FastifyReply;
  }
}
