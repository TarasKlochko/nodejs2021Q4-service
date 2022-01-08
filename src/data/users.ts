import { FastifyRequest } from 'fastify';
import { User, UserID } from '../model/user';

let users: User[] = [
  {
    id: '59b3b81a-32cb-409c-b21f-31b27c32d161',
    name: 'User one',
    login: 'User1',
    password: '111',
  },
  {
    id: '59b3b81a-32cb-409c-b21f-31b27c32d162',
    name: 'User two',
    login: 'User2',
    password: '222',
  },
  {
    id: '59b3b81a-32cb-409c-b21f-31b27c32d163',
    name: 'User three',
    login: 'User3',
    password: '333',
  },
];

/**
 * Return users
 * @returns users User[]
 */

function getAll() {
  return users;
}

/**
 * Finds and returns user by ID
 * @param id first term string
 * @returns user User
 */

function getByID(id: UserID) {
  const user = users.find((userItem) => userItem.id === id);
  return user;
}

/**
 * Adds new user to users
 * @param user first term User
 * @returns void
 */

async function add(user: User) {
  users = [...users, user];
}

/**
 * Updates user by ID
 * @param req first term FastifyRequest
 * @returns void
 */

async function update(req: FastifyRequest) {
  const { id } = <{ id: UserID }>req.params;
  const { name, login, password } = <User>req.body;
  users = users.map((user) =>
    user.id === id ? { ...user, name, login, password } : user
  );
}

/**
 * Deletes user by ID
 * @param id first term string
 * @returns void
 */

async function deleteByID(id: UserID) {
  users = users.filter((user) => user.id !== id);
}

export default { getAll, getByID, add, update, deleteByID };
