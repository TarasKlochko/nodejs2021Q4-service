import { FastifyRequest } from 'fastify';
import { Board, BoardID } from '../model/board';

let boards: Board[] = [
  {
    id: '59b3b81a-32cb-409c-b21f-31b27c32d151',
    title: 'Board one',
    columns: [
      {
        id: '58b3b81a-32cb-409c-b21f-31b27c32d151',
        title: 'Column1',
        order: 1,
      },
    ],
  },
  {
    id: '59b3b81a-32cb-409c-b21f-31b27c32d142',
    title: 'Board two',
    columns: [
      {
        id: '57b3b81a-32cb-409c-b21f-31b27c32d151',
        title: 'Column2',
        order: 2,
      },
    ],
  },
  {
    id: '59b3b81a-32cb-409c-b21f-31b27c32d133',
    title: 'Board three',
    columns: [
      {
        id: '56b3b81a-32cb-409c-b21f-31b27c32d151',
        title: 'Column3',
        order: 3,
      },
    ],
  },
];

/**
 * Return boards
 * @returns boards Board[]
 */

function getAll() {
  return boards;
}

/**
 * Finds and returns board by ID
 * @param id first term BoardID
 * @returns board Board
 */

function getByID(id: BoardID) {
  const board = boards.find((boardItem) => boardItem.id === id);
  return board;
}

/**
 * Adds new board to boards
 * @param board first term Board
 * @returns void
 */

async function add(board: Board) {
  boards = [...boards, board];
}

/**
 * Updates board by ID
 * @param req first term FastifyRequest
 * @returns void
 */

async function update(req: FastifyRequest) {
  const { id } = <{ id: BoardID }>req.params;
  const { title, columns } = <Board>req.body;
  boards = boards.map((board) =>
    board.id === id ? { ...board, title, columns } : board
  );
}

/**
 * Deletes board by ID
 * @param id first term string
 * @returns void
 */

async function deleteByID(id: BoardID) {
  boards = boards.filter((board) => board.id !== id);
}

export default { getAll, getByID, add, update, deleteByID };
