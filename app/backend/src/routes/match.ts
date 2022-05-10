import { Router } from 'express';
import validateToken from '../middlewares/tokenValidate';
import { editMatch, listMatches, saveMatches, updateInProgressMatch } from '../controllers/matchesController';
import validateTeams from '../middlewares/matchMiddlewares';

const matchRouter = Router();

matchRouter.get('/', listMatches);
matchRouter.post('/', validateToken, validateTeams, saveMatches);
matchRouter.patch('/:id/finish', updateInProgressMatch);
matchRouter.patch('/:id', editMatch)

export default matchRouter;
