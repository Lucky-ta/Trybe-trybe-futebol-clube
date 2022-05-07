import { Response, Request } from 'express';
import getAllMatches from '../services/matchService';

const listMatches = async (req: Request, res: Response) => {
  try {
    const { inProgress } = req.query;
    const result = await getAllMatches(inProgress);
    return res.status(result.status).json(result.data);
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
};
export default listMatches;
