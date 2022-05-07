import { Router } from 'express';
import listMatches from '../controllers/matchesController';

const matchRouter = Router();

matchRouter.get('/', listMatches);

export default matchRouter;
