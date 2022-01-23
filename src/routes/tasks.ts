import {
  FastifyInstance,
  RouteShorthandOptions,
  RouteShorthandOptionsWithHandler,
} from 'fastify';
import { checkToken } from '../common/checkToken';

import {
  getTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
} from '../controllers/tasks';

// Task schema
const Task = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    order: { type: 'integer' },
    description: { type: 'string' },
    userId: { type: ['null', 'string'] },
    boardId: { type: ['null', 'string'] },
    columnId: { type: ['null', 'string'] },
  },
};

const getTasksOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Task,
      },
    },
  },
  handler: getTasks,
  preHandler: checkToken,
};

const getTaskOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      200: Task,
    },
  },
  handler: getTask,
  preHandler: checkToken,
};

const postTaskOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    body: {
      type: 'object',
      require: ['title', 'order', 'description', 'userId', 'columnId'],
      properties: {
        title: { type: 'string' },
        order: { type: 'integer' },
        description: { type: 'string' },
        userId: { type: ['null', 'string'] },
        boardId: { type: 'string' },
        columnId: { type: 'null' },
      },
    },
  },
  handler: addTask,
  preHandler: checkToken,
};

const updateTaskOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      200: Task,
    },
  },
  handler: updateTask,
  preHandler: checkToken,
};

const deleteTaskOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      404: Task,
    },
  },
  handler: deleteTask,
  preHandler: checkToken,
};

/**
 * Function that handles tasks routes
 * @param fastify first term FastifyInstance
 * @param options second term RouteShorthandOptions
 * @param done  third term function
 * @returns voide
 */

export function tasksRoutes(
  fastify: FastifyInstance,
  _options: RouteShorthandOptions,
  done: () => void
) {
  // Get get all tasks
  fastify.get('/boards/:id/tasks', getTasksOpts);

  // Get single task
  fastify.get('/boards/:id/tasks/:id', getTaskOpts);

  // Add single task
  fastify.post('/boards/:id/tasks', postTaskOpts);

  // Update task
  fastify.put('/boards/:id/tasks/:id', updateTaskOpts);
  // Delete single task
  fastify.delete('/boards/:id/tasks/:id', deleteTaskOpts);
  done();
}
