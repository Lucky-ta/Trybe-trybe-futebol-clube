import { Request, Response } from 'express';
import filterLeaderboard from '../services/leaderboardService';

const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const result = await filterLeaderboard();
    return res.status(result.status).json(result.data);
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
};

export default getLeaderboard;
