import { describe, expect, it, jest } from '@jest/globals';
import { startServer } from '@setup/start-server';
import type { FastifyInstance } from 'fastify';

import { afterEach } from 'node:test';

describe('startServer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should start the server successfully', async () => {
    const mockedListen = jest.fn();
    const mockedInstance = { listen: mockedListen } as unknown as FastifyInstance;
    const mockedOptions = {
      port: 3000,
      host: 'localhost',
    };

    await startServer(mockedInstance, mockedOptions);

    expect(mockedListen).toHaveBeenCalledWith(mockedOptions);
  });

  it('should handle errors when starting the server', async () => {
    const mockedProcessExitError = new Error('process.exit was called');
    const mockedProcessExit = jest.spyOn(process, 'exit').mockImplementation(() => {
      throw mockedProcessExitError;
    });

    const mockedListen = jest.fn<() => Promise<void>>().mockRejectedValue(new Error('Server error'));
    const mockedInstance = { listen: mockedListen } as unknown as FastifyInstance;
    const mockedOptions = {
      port: 3000,
      host: 'localhost',
    };

    await expect(startServer(mockedInstance, mockedOptions)).rejects.toThrow(mockedProcessExitError);
    expect(mockedProcessExit).toHaveBeenCalledWith(1);
  });
});
