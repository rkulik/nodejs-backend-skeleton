import { config } from '@configs/base';
import { buildInstance } from '@setup/build-instance';
import { startServer } from '@setup/start-server';

const main = async (): Promise<void> => {
  const {
    server: { port, host },
  } = config;

  await startServer(buildInstance(), { port, host });
};

main();
