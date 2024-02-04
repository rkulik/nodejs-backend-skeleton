import { CustomFastifyInstance } from '@src/types';
import { FastifyListenOptions } from 'fastify';

export const startServer = async (server: CustomFastifyInstance, options: FastifyListenOptions): Promise<void> => {
  try {
    const address = await server.listen(options);
    console.log(`Server is listening at: ${address}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
