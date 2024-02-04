import type { Config } from 'drizzle-kit';

const config: Config = {
  schema: 'src/modules/*/schemas.ts',
  out: 'src/migrations',
  driver: 'better-sqlite',
  dbCredentials: {
    url: 'sqlite.db',
  },
};

// eslint-disable-next-line import/no-default-export
export default config;
