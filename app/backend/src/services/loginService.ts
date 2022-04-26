import { sign } from 'jsonwebtoken';
import { readFile } from 'fs/promises';
import User from '../database/models/user';
import { INCORRECTINFORMATIONSERROR } from '../errors/errorsMessages';

const SECRET = readFile(
  '/home/lucas/sd-015-b-trybe-futebol-clube/app/backend/jwt.evaluation.key',
  'utf-8',
);

export type UserCredentials = {
  email: string;
  password: string;
};

export const userLogin = async (email: string, password:string) => {
  const user = await User
    .findOne({ where: { email, password }, attributes: { exclude: ['password'] } });

  if (user !== null) {
    const token = sign(user, await SECRET, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });
    return { status: 200, result: { user, token } };
  }
  return { status: 401, result: { message: INCORRECTINFORMATIONSERROR } };
};
