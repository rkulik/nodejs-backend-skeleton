import { TokenPayload } from '@src/types';
import 'fastify';
import { JwtPayload } from 'jsonwebtoken';

declare module 'fastify' {
  interface FastifyRequest {
    tokenPayload: (TokenPayload & JwtPayload) | undefined;
  }
}
