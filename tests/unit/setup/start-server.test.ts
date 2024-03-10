import fastify, { FastifyInstance, FastifyListenOptions } from 'fastify';

import { startServer } from '../../../src/setup/start-server';

jest.mock('fastify', () => {
  return {
    __esModule: true,
    default: jest.fn(() => {
      return {
        listen: jest.fn().mockResolvedValue('127.0.0.1:3000'),
      };
    }),
    FastifyListenOptions: {},
  };
});

describe('startServer', () => {
  it('should start the server successfully', async () => {
    const server: FastifyInstance = fastify();
    const options: FastifyListenOptions = {};

    await startServer(server, options);

    expect(server.listen).toHaveBeenCalledWith(options);
  });

  it('should log an error and exit the process if server fails to start', async () => {
    const errorMessage = 'Server failed to start';
    const server: FastifyInstance = fastify();
    const options: FastifyListenOptions = {};

    (server.listen as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const processExitSpy = jest.spyOn(process, 'exit').mockImplementation();

    await startServer(server, options);

    expect(server.listen).toHaveBeenCalledWith(options);
    expect(consoleErrorSpy).toHaveBeenCalledWith(new Error(errorMessage));
    expect(processExitSpy).toHaveBeenCalledWith(1);

    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });
});
