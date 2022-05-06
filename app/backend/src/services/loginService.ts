import { sign, verify } from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { compare } from 'bcrypt';
import User from '../database/models/user';
import { INCORRECTINFORMATIONSERROR } from '../errors/errorsMessages';

export type UserCredentials = {
  email: string;
  password: string;
};
const SECRET = readFileSync('jwt.evaluation.key', { encoding: 'utf-8' })
  .trim();

export const userLogin = async (email: string, password:string) => {
  const result = await User
    .findOne({ where: { email } });

  if (result !== null) {
    const verifyPassword = await compare(password, result.dataValues.password);

    if (verifyPassword) {
      const { password: dbPass, ...user } = result.dataValues;
      const token = sign(user, SECRET, {
        expiresIn: '1d',
        algorithm: 'HS256',
      });
      return { status: 200, result: { user, token } };
    }
  } return { status: 401, result: { message: INCORRECTINFORMATIONSERROR } };
};

interface ValidateToken {
  role: string;
}

export const validateLogin = (token: string) => {
  try {
    const data = <ValidateToken>verify(token, SECRET);
    return { status: 200, data: data.role };
  } catch (e: any) {
    return { status: 404, data: e.message };
  }
};
