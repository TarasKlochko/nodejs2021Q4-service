const {
  getUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser,
} = require('../controllers/users');

// User schema
const User = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' },
    password: { type: 'string' },
  },
};

// Options for get all users
const getUsersOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: User,
      },
    },
  },
  handler: getUsers,
};

// Options for get single user
const getUserOpts = {
  schema: {
    response: {
      200: User,
    },
  },
  handler: getUser,
};

// Options for add single user
const postUserOpts = {
  schema: {
    body: {
      type: 'object',
      require: ['name', 'login', 'password'],
      properties: {
        name: { type: 'string' },
        login: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      201: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          login: { type: 'string' },
        },
      },
    },
  },
  handler: addUser,
};

// Options for delete single user
const deleteUserOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler: deleteUser,
};

// Options for update user
const updateUserOpts = {
  schema: {
    response: {
      200: User,
    },
  },
  handler: updateUser,
};

function userRoutes(fastify, options, done) {
  // Get all users
  fastify.get('/users', getUsersOpts);

  // Get single user
  fastify.get('/users/:id', getUserOpts);
  done();
  // Add single user
  fastify.post('/users', postUserOpts);

  // Delete single user
  fastify.delete('/users/:id', deleteUserOpts);

  // Update user
  fastify.put('/users/:id', updateUserOpts);
  done();
}

module.exports = userRoutes;
