import { Router } from 'express';
import { login, validate } from '../controllers/loginController';
import { emailMiddleware, passwordMiddleware } from '../middlewares/loginMiddleware';

const loginRouter = Router();

loginRouter.post(
  '/',
  emailMiddleware,
  passwordMiddleware,
  login,
);

loginRouter.get('/validate', validate);

export default loginRouter;
