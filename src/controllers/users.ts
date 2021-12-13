import { FastifyReply, FastifyRequest } from 'fastify';
import { v4 as uuidV4 } from 'uuid';
import tasks from '../data/tasks';
import { UserID, User } from '../model/user';

import users from '../data/users';

/**
 * Sends all users
 * @param req first term FastifyRequest
 * @param reply second term FastifyReply
 * @returns void
 */

export const getUsers = (_req: FastifyRequest, reply: FastifyReply) => {
  reply.send(users.getAll());
};

/**
 * Sends single user
 * @param req first term FastifyRequest
 * @param reply second term FastifyReply
 * @returns void
 */

export const getUser = (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = <{ id: UserID }>req.params;
  const user = users.getByID(id);
  reply.send(user);
};

/**
 * Creates and sends new user
 * @param req first term FastifyRequest
 * @param reply second term FastifyReply
 * @returns void
 */

export const addUser = (req: FastifyRequest, reply: FastifyReply) => {
  const { name, login, password } = <User>req.body;
  const user = {
    id: uuidV4(),
    name,
    login,
    password,
  };
  users.add(user);
  reply.code(201).send(user);
};

/**
 * Deletes single user and sends message about this
 * @param req first term FastifyRequest
 * @param reply second term FastifyReply
 * @returns void
 */

export const deleteUser = (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = <{ id: UserID }>req.params;
  users.deleteByID(id);
  tasks.cleanUserValue(id);
  reply.send({ message: `User ${id} has been removed` });
};

/**
 * Updates single user and sends one
 * @param req first term FastifyRequest
 * @param reply second term FastifyReply
 * @returns void
 */

export const updateUser = (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = <{ id: UserID }>req.params;
  users.update(req);
  const user = users.getByID(id);
  reply.send(user);
};
