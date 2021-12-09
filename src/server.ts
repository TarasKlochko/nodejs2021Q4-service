import Fastify, { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { boardRoutes } from './routes/boards';
import { tasksRoutes } from './routes/tasks';
import userRoutes from './routes/users';
import { PORT } from './common/config';

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
fastify.register(boardRoutes);
fastify.register(tasksRoutes);

const start = async () => {
  try {
    await fastify.listen(PORT);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
