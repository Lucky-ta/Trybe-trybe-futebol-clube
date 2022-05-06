import { Router } from 'express';
import { listTeams, listTeamsById } from '../controllers/teamsController';

const teamsRouter = Router();

teamsRouter.get('/', listTeams)
teamsRouter.get('/:id', listTeamsById)

export default teamsRouter;