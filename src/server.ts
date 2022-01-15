import Fastify, { FastifyInstance } from 'fastify';
import fastifySwagger from 'fastify-swagger';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { boardRoutes } from './routes/boards';
import { tasksRoutes } from './routes/tasks';
import userRoutes from './routes/users';
import { PORT } from './common/config';
import 'reflect-metadata';

const fastify: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  Fastify({
    logger: {
      prettyPrint: {
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname,reqId',
      },
      file: './log/file.log',
    },
  });

fastify.addHook('onSend', (req, reply, _payload, done) => {
  req.log.info(
    {
      url: req.raw.url,
      body: req.body,
      query: req.query,
      statusCode: reply.statusCode,
    },
    'received request'
  );
  done();
});

fastify.register(fastifySwagger, {
  exposeRoute: true,
  routePrefix: '/docs',
});

fastify.register(userRoutes);
fastify.register(boardRoutes);
fastify.register(tasksRoutes);

/**
 * Listens user port. If an error occurs then log one and stops server
 * @returns void
 */

const start = async () => {
  try {
    await fastify.listen(PORT, '0.0.0.0');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
