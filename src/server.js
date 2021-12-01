const fastify = require('fastify')({ logger: true });
const { PORT } = require('./common/config');
fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swager: {
    info: { title: 'fastify-api' },
  },
});

fastify.register(require('./routes/users'));

const start = async () => {
  try {
    await fastify.listen(PORT);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
