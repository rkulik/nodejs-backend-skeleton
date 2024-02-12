import { Factory } from '@src/factory';
import 'fastify';

declare module 'fastify' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface FastifyInstance {
    factory: Factory;
  }
}
