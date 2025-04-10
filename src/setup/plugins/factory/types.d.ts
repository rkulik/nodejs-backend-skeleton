import type { Factory } from '@app/factory';
import 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    factory: Factory;
  }
}
