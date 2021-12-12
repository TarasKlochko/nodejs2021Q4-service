import { FastifyRequest, FastifyReply } from 'fastify';
import { v4 as uuidV4 } from 'uuid';
import tasks from '../data/tasks';
import { TaskID, Task } from '../model/task';

/**
 * Sends all tasks
 * @param req first term FastifyRequest
 * @param reply second term FastifyReply
 * @returns void
 */

const getTasks = (_req: FastifyRequest, reply: FastifyReply) => {
  reply.send(tasks.getAll());
};

/**
 * Sends single task or 404 code if one does not exist
 * @param req first term FastifyRequest
 * @param reply second term FastifyReply
 * @returns void
 */

const getTask = (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = <{ id: TaskID }>req.params;

  const task = tasks.getByID(id);
  if (task) {
    reply.send(task);
  } else {
    reply.code(404).send();
  }
};

/**
 * Creates and sends new task
 * @param req first term FastifyRequest
 * @param reply second term FastifyReply
 * @returns void
 */

const addTask = (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = <{ id: TaskID }>req.params;
  const { title, order, description, userId, columnId } = <Task>req.body;
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

/**
 * Updates and sends this task
 * @param req first term FastifyRequest
 * @param reply second term FastifyReply
 * @returns void
 */

const updateTask = (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = <{ id: TaskID }>req.params;
  tasks.update(req);
  const task = tasks.getByID(id);
  reply.send(task);
};

/**
 * Deletes task and sends a confirmation
 * @param req first term FastifyRequest
 * @param reply second term FastifyReply
 * @returns void
 */

const deleteTask = (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = <{ id: TaskID }>req.params;
  tasks.deleteByID(id);
  reply.send();
};

export { getTasks, getTask, addTask, updateTask, deleteTask };
