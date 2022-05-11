import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET } from '../services/loginService';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    verify(authorization || '', SECRET);
    next();
  } catch (e: any) {
    return res.status(404).json(e.message);
  }
};

export default validateToken;
