const { v4: uuidV4 } = require('uuid');
let boards = require('../data/boards');
const tasks = require('../data/tasks');

const getBoards = (req, reply) => {
  reply.send(boards);
};

const getBoard = (req, reply) => {
  const { id } = req.params;
  const board = boards.find((boardItem) => boardItem.id === id);
  if (board) {
    reply.send(board);
  } else {
    reply.code(404).send();
  }
};

const addBoard = (req, reply) => {
  const { title, columns } = req.body;
  const board = {
    id: uuidV4(),
    title,
    columns,
  };
  boards = [...boards, board];
  reply.code(201).send(board);
};

const updateBoard = (req, reply) => {
  const { id } = req.params;
  const { title, columns } = req.body;
  boards = boards.map((boardItem) =>
    boardItem.id === id ? { id, title, columns } : boardItem
  );
  const board = boards.find((boardItem) => boardItem.id === id);
  reply.send(board);
};

const deleteBoard = (req, reply) => {
  const { id } = req.params;

  boards = boards.filter((boardItem) => boardItem.id !== id);
  tasks.deleteByID(id, true);
  reply.type('application/json').send(JSON.stringify(id));
};

module.exports = {
  getBoards,
  getBoard,
  addBoard,
  updateBoard,
  deleteBoard,
};
