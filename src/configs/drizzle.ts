import { config as baseConfig } from '@configs/base';
import type { Config } from 'drizzle-kit';

const config: Config = {
  schema: 'src/modules/*/schemas/database.ts',
  out: baseConfig.database.migrationsFolder,
  driver: 'better-sqlite',
  dbCredentials: {
    url: baseConfig.database.url,
  },
};

// eslint-disable-next-line import/no-default-export
export default config;
