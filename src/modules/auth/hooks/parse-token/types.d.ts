import type { TokenPayload } from '@app/types';
import 'fastify';
import type { JwtPayload } from 'jsonwebtoken';

declare module 'fastify' {
  interface FastifyRequest {
    tokenPayload: (TokenPayload & JwtPayload) | undefined;
  }
}
