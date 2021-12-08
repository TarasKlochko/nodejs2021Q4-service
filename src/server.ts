import Fastify, { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import userRoutes from './routes/users';

const { PORT } = require('./common/config.ts');

const fastify: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  Fastify({
    logger: true,
  });
fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swager: {
    info: { title: 'fastify-api' },
  },
});

fastify.register(userRoutes);
fastify.register(require('./routes/boards'));
fastify.register(require('./routes/tasks'));

const start = async () => {
  try {
    await fastify.listen(PORT);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
