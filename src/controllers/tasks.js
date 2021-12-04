const { v4: uuidV4 } = require('uuid');
const tasks = require('../data/tasks');

const getTasks = (req, reply) => {
  reply.send(tasks.getAll());
};

const getTask = (req, reply) => {
  const { id } = req.params;

  const task = tasks.getByID(id);
  if (task) {
    reply.send(task);
  } else {
    reply.code(404).send();
  }
};

const addTask = (req, reply) => {
  const { id } = req.params;
  const { title, order, description, userId, columnId } = req.body;
  const task = {
    id: uuidV4(),
    title,
    order,
    description,
    userId,
    boardId: id,
    columnId,
  };
  tasks.add(task);
  reply.code(201).send(task);
};

const updateTask = (req, reply) => {
  const { id } = req.params;
  tasks.update(req);
  const task = tasks.getByID(id);
  reply.send(task);
};

const deleteTask = (req, reply) => {
  const { id } = req.params;
  tasks.deleteByID(id);
  reply.send();
};

module.exports = {
  getTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
};
