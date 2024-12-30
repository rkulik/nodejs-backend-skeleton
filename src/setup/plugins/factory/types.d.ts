import { Factory } from '@src/factory';
import 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    factory: Factory;
  }
}
