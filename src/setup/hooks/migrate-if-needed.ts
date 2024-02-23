import { config } from '@configs/base';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { onReadyHookHandler } from 'fastify';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export const migrateIfNeeded: onReadyHookHandler = function (done) {
  migrate(this.factory.createDatabase(), { migrationsFolder: config.database.migrationsFolder });
  done();
};
