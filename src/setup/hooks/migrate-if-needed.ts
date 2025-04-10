import { config } from '@app/configs/base';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import type { onReadyHookHandler } from 'fastify';

export const migrateIfNeeded: onReadyHookHandler = function (done) {
  migrate(this.factory.createDatabase(), { migrationsFolder: config.database.migrationsFolder });
  done();
};
