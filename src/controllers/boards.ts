import { FastifyRequest, FastifyReply } from 'fastify';
import { v4 as uuidV4 } from 'uuid';
import tasks from '../data/tasks';
import { BoardID, Board } from '../model/board';
import boards from '../data/boards';

/**
 * Sends all boards
 * @param _req first term FastifyRequest
 * @param reply second term FastifyReply
 * @returns void
 */

export const getBoards = (_req: FastifyRequest, reply: FastifyReply) => {
  reply.send(boards.getAll());
};

/**
 * Sends single board or 404 code if board does not exist
 * @param req first term FastifyRequest
 * @param reply second term FastifyReply
 * @returns void
 */

export const getBoard = (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = <{ id: BoardID }>req.params;
  const board = boards.getByID(id);
  if (board) {
    reply.send(board);
  } else {
    reply.code(404).send();
  }
};

/**
 * Creates and sends new board
 * @param req first term FastifyRequest
 * @param reply second term FastifyReply
 * @returns void
 */

export const addBoard = (req: FastifyRequest, reply: FastifyReply) => {
  const { title, columns } = <Board>req.body;
  const board = {
    id: uuidV4(),
    title,
    columns,
  };
  boards.add(board);
  reply.code(201).send(board);
};

/**
 * Updates and sends board
 * @param req first term FastifyRequest
 * @param reply second term FastifyReply
 * @returns void
 */

export const updateBoard = (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = <{ id: BoardID }>req.params;
  boards.update(req);
  const board = boards.getByID(id);
  reply.send(board);
};

/**
 * Deletes board and sends id of that board
 * @param req first term FastifyRequest
 * @param reply second term FastifyReply
 * @returns void
 */

export const deleteBoard = (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = <{ id: BoardID }>req.params;

  boards.deleteByID(id);
  tasks.deleteByID(id, true);
  reply.type('application/json').send(JSON.stringify(id));
};
