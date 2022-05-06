import { Router } from 'express';
import login from '../controllers/loginController';
import { emailMiddleware, passwordMiddleware } from '../middlewares/loginMiddleware';

const loginRouter = Router();

loginRouter.post(
  '/',
  emailMiddleware,
  passwordMiddleware,
  login,
);

loginRouter.get('/validate', )

export default loginRouter;
