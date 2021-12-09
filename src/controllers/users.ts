import { FastifyReply, FastifyRequest } from 'fastify';

const { v4: uuidV4 } = require('uuid');
let users = require('../data/users');
import tasks from '../data/tasks';

type UserID = { id: string };

interface User extends UserID {
  name: string;
  login: string;
  password: string;
}

export const getUsers = (req: FastifyRequest, reply: FastifyReply) => {
  reply.send(users);
};

export const getUser = (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = <UserID>req.params;
  const user = users.find((userItem: User) => userItem.id === id);
  reply.send(user);
};

export const addUser = (req: FastifyRequest, reply: FastifyReply) => {
  const { name, login, password } = <User>req.body;
  const user = {
    id: uuidV4(),
    name,
    login,
    password,
  };
  users = [...users, user];
  reply.code(201).send(user);
};

export const deleteUser = (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = <UserID>req.params;
  users = users.filter((user: User) => user.id !== id);
  tasks.cleanUserValue(id);
  reply.send({ message: `User ${id} has been removed` });
};

export const updateUser = (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = <UserID>req.params;
  const { name, login, password } = <User>req.body;
  users = users.map((user: User) =>
    user.id === id ? { id, name, login, password } : user
  );
  const user = users.find((userItem: User) => userItem.id === id);
  reply.send(user);
};
