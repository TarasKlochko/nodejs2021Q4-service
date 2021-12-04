const { v4: uuidV4 } = require('uuid');
let users = require('../data/users');
const tasks = require('../data/tasks');

const getUsers = (req, reply) => {
  reply.send(users);
};

const getUser = (req, reply) => {
  const { id } = req.params;
  const user = users.find((userItem) => userItem.id === id);
  reply.send(user);
};

const addUser = (req, reply) => {
  const { name, login, password } = req.body;
  const user = {
    id: uuidV4(),
    name,
    login,
    password,
  };
  users = [...users, user];
  reply.code(201).send(user);
};

const deleteUser = (req, reply) => {
  const { id } = req.params;
  users = users.filter((user) => user.id !== id);
  tasks.cleanUserValue(id);
  reply.send({ message: `User ${id} has been removed` });
};

const updateUser = (req, reply) => {
  const { id } = req.params;
  const { name, login, password } = req.body;
  users = users.map((user) =>
    user.id === id ? { id, name, login, password } : user
  );
  const user = users.find((userItem) => userItem.id === id);
  reply.send(user);
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser,
};
