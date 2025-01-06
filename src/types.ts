import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';

export type Action<T = void> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute: (...args: any[]) => T;
};

export type Database = BetterSQLite3Database;

export type TokenPayload = {
  user: {
    id: number;
    name: string;
  };
};
