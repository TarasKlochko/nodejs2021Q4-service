import {
  FastifyInstance,
  RouteShorthandOptions,
  RouteShorthandOptionsWithHandler,
} from 'fastify';

import {
  getUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser,
} from '../controllers/users';

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
const getUsersOpts: RouteShorthandOptionsWithHandler = {
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
const getUserOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      200: User,
    },
  },
  handler: getUser,
};

// Options for add single user
const postUserOpts: RouteShorthandOptionsWithHandler = {
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
const deleteUserOpts: RouteShorthandOptionsWithHandler = {
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
const updateUserOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      200: User,
    },
  },
  handler: updateUser,
};

/**
 * Function that handles user routes
 * @param fastify first term FastifyInstance
 * @param options second term RouteShorthandOptions
 * @param done  third term function
 * @returns voide
 */

export default function userRoutes(
  fastify: FastifyInstance,
  _options: RouteShorthandOptions,
  done: () => void
) {
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
