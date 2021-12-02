const {
  getTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks');

// Task schema
const Task = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    order: { type: 'integer' },
    description: { type: 'string' },
    userId: { type: 'null' },
    boardId: { type: 'string' },
    columnId: { type: 'null' },
  },
};

const getTasksOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Task,
      },
    },
  },
  handler: getTasks,
};

const getTaskOpts = {
  schema: {
    response: {
      200: Task,
    },
  },
  handler: getTask,
};

const postTaskOpts = {
  schema: {
    body: {
      type: 'object',
      require: ['title', 'order', 'description', 'userId', 'columnId'],
      properties: {
        title: { type: 'string' },
        order: { type: 'integer' },
        description: { type: 'string' },
        userId: { type: 'null' },
        columnId: { type: 'null' },
      },
    },
  },
  handler: addTask,
};

const updateTaskOpts = {
  schema: {
    response: {
      200: Task,
    },
  },
  handler: updateTask,
};

const deleteTaskOpts = {
  schema: {
    response: {
      404: Task,
    },
  },
  handler: deleteTask,
};

function tasksRoutes(fastify, options, done) {
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

module.exports = tasksRoutes;
