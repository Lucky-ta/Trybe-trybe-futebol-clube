import { Router } from 'express';
import validateToken from '../middlewares/tokenValidate';
import { listMatches, saveMatches } from '../controllers/matchesController';

const matchRouter = Router();

matchRouter.get('/', listMatches);
matchRouter.post('/', validateToken, saveMatches);

export default matchRouter;
