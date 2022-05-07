import { Response, Request } from 'express';
import { getAllMatches, postMatches } from '../services/matchService';

export const listMatches = async (req: Request, res: Response) => {
  try {
    const { inProgress } = req.query;
    const result = await getAllMatches(inProgress);
    return res.status(result.status).json(result.data);
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
};

export const saveMatches = async (req: Request, res: Response) => {
  try {
    const match = req.body;
    const result = await postMatches(match);
    return res.status(result.status).json(result.data);
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
};
