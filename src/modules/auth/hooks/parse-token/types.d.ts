import { TokenPayload } from '@src/types';
import 'fastify';
import { JwtPayload } from 'jsonwebtoken';

declare module 'fastify' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface FastifyRequest {
    tokenPayload: (TokenPayload & JwtPayload) | undefined;
  }
}
