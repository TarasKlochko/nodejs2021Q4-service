import { FastifyRequest, FastifyReply } from 'fastify';
import { v4 as uuidV4 } from 'uuid';
import tasks from '../data/tasks';

const getTasks = (req: FastifyRequest, reply: FastifyReply) => {
  reply.send(tasks.getAll());
};

type TaskID = string;
interface Task {
  id: TaskID;
  title: string;
  order: number;
  description: string;
  userId: null | string;
  boardId: null | string;
  columnId: null | string;
}

const getTask = (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = <{ id: TaskID }>req.params;

  const task = tasks.getByID(id);
  if (task) {
    reply.send(task);
  } else {
    reply.code(404).send();
  }
};

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

const updateTask = (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = <{ id: TaskID }>req.params;
  tasks.update(req);
  const task = tasks.getByID(id);
  reply.send(task);
};

const deleteTask = (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = <{ id: TaskID }>req.params;
  tasks.deleteByID(id);
  reply.send();
};

export { getTasks, getTask, addTask, updateTask, deleteTask };
