import { config } from '@app/configs/base';
import { buildInstance } from '@app/setup/build-instance';
import { startServer } from '@app/setup/start-server';

const main = async (): Promise<void> => {
  const {
    server: { port, host },
  } = config;

  await startServer(buildInstance(), { port, host });
};

void main();
