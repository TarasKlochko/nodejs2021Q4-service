const {
  getBoards,
  getBoard,
  addBoard,
  updateBoard,
  deleteBoard,
} = require('../controllers/boards');

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

const getBoardsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Board,
      },
    },
  },
  handler: getBoards,
};

const getBoardOpts = {
  schema: {
    response: {
      200: Board,
    },
  },
  handler: getBoard,
};

const postBoardOpts = {
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
};

const updateBoardOpts = {
  schema: {
    response: {
      200: Board,
    },
  },
  handler: updateBoard,
};

const deleteBoardOpts = {
  schema: {
    response: {
      200: Board,
    },
  },
  handler: deleteBoard,
};

function boardRoutes(fastify, options, done) {
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

module.exports = boardRoutes;
