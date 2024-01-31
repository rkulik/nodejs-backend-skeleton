import { buildServer } from './setup/build-server';
import { startServer } from './setup/start-server';

const main = async (): Promise<void> => {
  await startServer(buildServer(), { port: 8080 });
};

main();
