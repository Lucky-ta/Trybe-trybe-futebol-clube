import { sign } from 'jsonwebtoken';
import { readFile } from 'fs/promises';
import User from '../database/models/user';
import { INCORRECTINFORMATIONSERROR } from '../errors/errorsMessages';

export type UserCredentials = {
  email: string;
  password: string;
};

export const userLogin = async (email: string, password:string) => {
  const SECRET = await readFile('jwt.evaluation.key', 'utf-8');

  const user = await User
    .findOne({ where: { email, password }, attributes: { exclude: ['password'] } });

  if (user !== null) {
    const token = sign(user, SECRET, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });
    return { status: 200, result: { user, token } };
  }
  return { status: 401, result: { message: INCORRECTINFORMATIONSERROR } };
};
