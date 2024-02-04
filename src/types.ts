import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import {
  FastifyBaseLogger,
  FastifyPluginOptions,
  FastifyInstance as OriginalFastifyInstance,
  FastifyPluginCallback as OriginalFastifyPluginCallback,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
} from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

export type CustomFastifyInstance = OriginalFastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyBaseLogger,
  ZodTypeProvider
>;

export type CustomFastifyPluginCallback<
  Options extends FastifyPluginOptions = Record<never, never>,
  Server extends RawServerBase = RawServerDefault,
> = OriginalFastifyPluginCallback<Options, Server, ZodTypeProvider>;

export type Action<T = void> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute: (...args: any[]) => T;
};

export type Database = BetterSQLite3Database;
