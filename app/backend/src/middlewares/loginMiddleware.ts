import { NextFunction, Request, Response } from 'express';
import { EMPTYFIELDERROR } from '../errors/errorsMessages';

export const emailMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  if (!email) return res.status(400).json(EMPTYFIELDERROR);
  if (email === '') return res.status(400).json(EMPTYFIELDERROR);

  next();
};

export const passwordMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  if (!password) return res.status(400).json(EMPTYFIELDERROR);
  if (password === '') return res.status(400).json(EMPTYFIELDERROR);

  next();
};
