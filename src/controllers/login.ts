import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../common/config';
import { Users } from '../entity/user.entity';
import bcrypt from 'bcryptjs';

export const createToken = async (req: FastifyRequest, reply: FastifyReply) => {
  const { login, password } = <{ login: string; password: string }>req.body;
  const user = await Users.findOne({ login: login });
  if (user && (await bcrypt.compare(password, user.password))) {
    const { id, login } = user;
    const token = jwt.sign({ id, login }, JWT_SECRET_KEY!, {
      expiresIn: '60m',
    });
    reply.code(200).send({ token: token });
  } else {
    reply.code(403).send({ message: `Wrong login/password` });
  }
};
