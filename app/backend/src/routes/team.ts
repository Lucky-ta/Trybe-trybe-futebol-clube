import { Router } from 'express';
import { listTeams } from '../controllers/teamsController';

const teamsRouter = Router();

teamsRouter.get('/', listTeams)

export default teamsRouter;