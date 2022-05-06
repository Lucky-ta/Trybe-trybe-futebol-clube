import { Response, Request } from 'express';
import { getAllTeams, getTeamById } from '../services/teamService';

export const listTeams = async (_req: Request, res: Response) => {
  try {
    const result = await getAllTeams();
    return res.status(result.status).json(result.data);
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
};

export const listTeamsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numberId = Number(id);
    const result = await getTeamById(numberId);
    return res.status(result.status).json(result.data);
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
};
