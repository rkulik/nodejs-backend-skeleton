import { afterEach, beforeAll } from '@jest/globals';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

import { config } from './src/configs/base';
import { Factory } from './src/factory';
import { users } from './src/modules/auth/schemas/database';
import { comments } from './src/modules/comments/schemas/database';
import { posts } from './src/modules/posts/schemas/database';

const factory = new Factory();
const database = factory.createDatabase();

beforeAll(() => {
  migrate(database, { migrationsFolder: config.database.migrationsFolder });
});

afterEach(() => {
  database.delete(comments).run();
  database.delete(posts).run();
  database.delete(users).run();
});
