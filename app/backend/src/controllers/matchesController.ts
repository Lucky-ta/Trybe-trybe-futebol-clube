import { Response, Request } from 'express';
import { getAllMatches } from '../services/matchService';

export const listMatches = async (_req: Request, res: Response) => {
    try {
      const result = await getAllMatches();
      return res.status(result.status).json(result.data);
    } catch (e: any) {
      return res.status(500).json(e.message);
    }
  };