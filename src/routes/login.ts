import {
  FastifyInstance,
  RouteShorthandOptions,
  RouteShorthandOptionsWithHandler,
} from 'fastify';
import { createToken } from '../controllers/login';

const postLoginOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    body: {
      type: 'object',
      require: ['login', 'password'],
      properties: {
        login: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      201: {
        type: 'string',
      },
    },
  },
  handler: createToken,
};

export default function loginRoutes(
  fastify: FastifyInstance,
  _options: RouteShorthandOptions,
  done: () => void
) {
  fastify.post('/login', postLoginOpts);
  done();
}
