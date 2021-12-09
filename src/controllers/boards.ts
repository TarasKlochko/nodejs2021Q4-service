import { FastifyRequest, FastifyReply } from 'fastify';
import { v4 as uuidV4 } from 'uuid';
import tasks from '../data/tasks';

let boards = require('../data/boards');

type BoardID = { id: string };

interface Board extends BoardID {
  title: string;
  columns: string;
}

export const getBoards = (req: FastifyRequest, reply: FastifyReply) => {
  reply.send(boards);
};

export const getBoard = (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = <BoardID>req.params;
  const board = boards.find((boardItem: Board) => boardItem.id === id);
  if (board) {
    reply.send(board);
  } else {
    reply.code(404).send();
  }
};

export const addBoard = (req: FastifyRequest, reply: FastifyReply) => {
  const { title, columns } = <Board>req.body;
  const board = {
    id: uuidV4(),
    title,
    columns,
  };
  boards = [...boards, board];
  reply.code(201).send(board);
};

export const updateBoard = (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = <BoardID>req.params;
  const { title, columns } = <Board>req.body;
  boards = boards.map((boardItem: Board) =>
    boardItem.id === id ? { id, title, columns } : boardItem
  );
  const board = boards.find((boardItem: Board) => boardItem.id === id);
  reply.send(board);
};

export const deleteBoard = (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = <BoardID>req.params;

  boards = boards.filter((boardItem: Board) => boardItem.id !== id);
  tasks.deleteByID(id, true);
  reply.type('application/json').send(JSON.stringify(id));
};
