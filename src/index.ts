import { config } from './config';
import { buildServer } from './setup/build-server';
import { startServer } from './setup/start-server';

const main = async (): Promise<void> => {
  const {
    server: { port, host },
  } = config;

  await startServer(buildServer(), { port, host });
};

main();
