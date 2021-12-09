import Fastify, { FastifyInstance } from 'fastify';
import fastifySwagger from 'fastify-swagger';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { boardRoutes } from './routes/boards';
import { tasksRoutes } from './routes/tasks';
import userRoutes from './routes/users';
import { PORT } from './common/config';

const fastify: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  Fastify({
    logger: true,
  });

fastify.register(fastifySwagger, {
  exposeRoute: true,
  routePrefix: '/docs',
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
