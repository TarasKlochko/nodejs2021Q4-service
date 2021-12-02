const { v4: uuidV4 } = require('uuid');
let tasks = require('../data/tasks');

const getTasks = (req, reply) => {
  reply.send(tasks);
};

const getTask = (req, reply) => {
  const { id } = req.params;
  const task = tasks.find((taskItem) => taskItem.id === id);
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
  tasks = [...tasks, task];
  reply.code(201).send(task);
};

const updateTask = (req, reply) => {
  const { id } = req.params;
  console.log('req.params', req.params);
  const { title, order, description, userId, columnId } = req.body;
  tasks = tasks.map((task) =>
    task.id === id
      ? { ...task, title, order, description, userId, columnId }
      : task
  );
  const task = tasks.find((taskItem) => taskItem.id === id);
  reply.send(task);
};

const deleteTask = (req, reply) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id !== id);
  reply.send();
};

module.exports = {
  getTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
};
