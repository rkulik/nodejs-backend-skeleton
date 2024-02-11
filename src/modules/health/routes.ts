import { CustomFastifyPluginCallback } from '@src/types';

const health: CustomFastifyPluginCallback = (server, _options, done) => {
  server.get('/health', (_request, reply) => {
    reply.sendSuccess({ status: 'healthy' });
  });

  done();
};

// eslint-disable-next-line import/no-default-export
export default health;
