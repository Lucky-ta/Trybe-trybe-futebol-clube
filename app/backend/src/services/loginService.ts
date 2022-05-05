import { sign } from 'jsonwebtoken';
import User from '../database/models/user';
import { INCORRECTINFORMATIONSERROR } from '../errors/errorsMessages';
import { readFileSync } from 'fs';
import { compare } from 'bcrypt'

export type UserCredentials = {
  email: string;
  password: string;
};

export const userLogin = async (email: string, password:string) => {
  const SECRET = readFileSync('jwt.evaluation.key', { encoding: 'utf-8' })
  .trim();

  const user = await User
    .findOne({ where: { email, password } });

  if (user !== null) {
    const verifyPassword = await compare(password, user.password);
    const { password: passDb, ...userWithouPassword } = user;

    if (verifyPassword) {
      const token = sign({userWithouPassword}, SECRET, {
        expiresIn: '1d',
        algorithm: 'HS256',
      });
      return { status: 200, result: { user, token } };
    }
  }
  return { status: 401, result: { message: INCORRECTINFORMATIONSERROR } };
};
