import { FastifyReply, FastifyRequest } from 'fastify';
import { v4 as uuidV4 } from 'uuid';
import tasks from '../data/tasks';
import { UserID, User } from '../model/user';
import users from '../data/users';
import bcrypt from 'bcryptjs';

/**
 * Sends all users
 * @param req first term FastifyRequest
 * @param reply second term FastifyReply
 * @returns void
 */

export const getUsers = async (_req: FastifyRequest, reply: FastifyReply) => {
  reply.send(await users.getAll());
};

/**
 * Sends single user
 * @param req first term FastifyRequest
 * @param reply second term FastifyReply
 * @returns void
 */

export const getUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = <{ id: UserID }>req.params;
  const user = await users.getByID(id);
  reply.send(user);
};

/**
 * Creates and sends new user
 * @param req first term FastifyRequest
 * @param reply second term FastifyReply
 * @returns void
 */

export const addUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const { name, login, password } = <User>req.body;
  const user = {
    id: uuidV4(),
    name,
    login,
    password: await bcrypt.hash(password, 10),
  };
  const res = await users.add(user);
  reply.code(201).send(res);
};

/**
 * Deletes single user and sends message about this
 * @param req first term FastifyRequest
 * @param reply second term FastifyReply
 * @returns void
 */

export const deleteUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = <{ id: UserID }>req.params;
  await users.deleteByID(id);
  tasks.cleanUserValue(id);
  reply.send({ message: `User ${id} has been removed` });
};

/**
 * Updates single user and sends one
 * @param req first term FastifyRequest
 * @param reply second term FastifyReply
 * @returns void
 */

export const updateUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = <{ id: UserID }>req.params;
  await users.update(req);
  const user = await users.getByID(id);
  reply.send(user);
};
