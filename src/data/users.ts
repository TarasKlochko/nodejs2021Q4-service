import { FastifyRequest } from 'fastify';
import { Users } from '../entity/user.entity';
import { User, UserID } from '../model/user';

async function getAll() {
  const users = await Users.find();
  return users;
}

async function getByID(id: UserID) {
  const user = await Users.findOne(id);
  return user;
}

async function add(user: User) {
  const newUser = Users.create(user);
  const res = await Users.save(newUser);
  return res;
}

async function update(req: FastifyRequest) {
  const { id } = <{ id: UserID }>req.params;
  const user = await Users.findOne(id);
  if (user) {
    Users.merge(user, <User>req.body);
    const res = await Users.save(user);
    return res;
  }
  return undefined;
}

async function deleteByID(id: UserID) {
  await Users.delete(id);
}

export default { getAll, getByID, add, update, deleteByID };
