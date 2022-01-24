import {
  FastifyInstance,
  RouteShorthandOptions,
  RouteShorthandOptionsWithHandler,
} from 'fastify';
import { checkToken } from '../common/checkToken';
import {
  getBoards,
  getBoard,
  addBoard,
  updateBoard,
  deleteBoard,
} from '../controllers/boards';

// Board schema
const Board = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    columns: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          order: { type: 'integer' },
        },
      },
    },
  },
};

const getBoardsOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Board,
      },
    },
  },
  handler: getBoards,
  preHandler: checkToken,
};

const getBoardOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      200: Board,
    },
  },
  handler: getBoard,
  preHandler: checkToken,
};

const postBoardOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    body: {
      type: 'object',
      require: ['title', 'columns'],
      properties: {
        title: { type: 'string' },
        columns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              order: { type: 'integer' },
            },
          },
        },
      },
    },
    response: {
      201: Board,
    },
  },
  handler: addBoard,
  preHandler: checkToken,
};

const updateBoardOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      200: Board,
    },
  },
  handler: updateBoard,
  preHandler: checkToken,
};

const deleteBoardOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      200: Board,
    },
  },
  handler: deleteBoard,
  preHandler: checkToken,
};

/**
 * Function that handles board routes
 * @param fastify first term FastifyInstance
 * @param options second term RouteShorthandOptions
 * @param done  third term function
 * @returns void
 */

export function boardRoutes(
  fastify: FastifyInstance,
  _options: RouteShorthandOptions,
  done: () => void
) {
  // Get all boards
  fastify.get('/boards', getBoardsOpts);

  // Get single board
  fastify.get('/boards/:id', getBoardOpts);

  // Add single board
  fastify.post('/boards', postBoardOpts);

  // Update board
  fastify.put('/boards/:id', updateBoardOpts);
  // Delete single board
  fastify.delete('/boards/:id', deleteBoardOpts);
  done();
}
