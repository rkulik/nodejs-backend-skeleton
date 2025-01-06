import type { FastifyInstance, FastifyListenOptions } from 'fastify';

export const startServer = async (instance: FastifyInstance, options: FastifyListenOptions): Promise<void> => {
  try {
    const address = await instance.listen(options);
    // eslint-disable-next-line no-console
    console.log(`Server is listening at: ${address}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  }
};
