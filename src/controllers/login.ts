import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../common/config';
import { Users } from '../entity/user.entity';

export const createToken = async (req: FastifyRequest, reply: FastifyReply) => {
  const { login, password } = <{ login: string; password: string }>req.body;
  // const { id } = <{ id: UserID }>req.params;
  const user = await Users.findOne({ login: login });
  if (user && user.password === password) {
    const { id, login } = user;
    const token = jwt.sign({ id, login }, JWT_SECRET_KEY!);
    reply.code(200).send(token);
  } else {
    reply.code(403).send({ message: `Wrong login/password` });
  }
};
