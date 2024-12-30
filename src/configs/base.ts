import dotenv from 'dotenv';

dotenv.config({ path: process.env.NODE_ENV ? [`.env.${process.env.NODE_ENV}`, '.env'] : '.env' });

export const config = {
  server: {
    port: Number(process.env.PORT!),
    host: process.env.HOST!,
    apiPrefix: process.env.API_PREFIX!,
  },
  database: {
    url: process.env.DATABASE_URL!,
    migrationsFolder: 'migrations',
  },
  auth: {
    password: {
      saltOrRounds: parseInt(process.env.ROUNDS!),
    },
    token: {
      secret: process.env.TOKEN_SECRET!,
      lifetime: parseInt(process.env.TOKEN_LIFETIME!),
    },
  },
};
