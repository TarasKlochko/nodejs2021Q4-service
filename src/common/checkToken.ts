import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from './config';

const checkToken = (
  req: FastifyRequest,
  reply: FastifyReply,
  done: () => void
) => {
  const tokenString = req.headers.authorization;
  if (tokenString !== undefined) {
    const [type, token] = tokenString.split(' ');
    if (type !== 'Bearer') {
      reply.status(401).send('Wrong auth authHeader');
      done();
    } else {
      try {
        jwt.verify(token, JWT_SECRET_KEY!);
      } catch (error) {
        reply.status(401).send('Wrong auth authHeader');
      }
      done();
    }
  } else {
    reply.status(401).send('Wrong auth schema');
    done();
  }
};
export { checkToken };
