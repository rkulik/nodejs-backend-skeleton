import { FastifyInstance, FastifyListenOptions } from 'fastify';

export const startServer = async (instance: FastifyInstance, options: FastifyListenOptions): Promise<void> => {
  try {
    const address = await instance.listen(options);
    console.log(`Server is listening at: ${address}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
