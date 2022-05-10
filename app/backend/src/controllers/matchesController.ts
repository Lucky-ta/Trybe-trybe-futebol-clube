import { Response, Request } from 'express';
import { getAllMatches, postMatches, updateMatch, updateMatchStatus } from '../services/matchService';

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

export const updateInProgressMatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numberId = Number(id);
    const result = await updateMatchStatus(numberId);
    return res.status(result.status).json(result.data);
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
};

export const editMatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body
    const numberId = Number(id);
    const result = await updateMatch(numberId, body);
    return res.status(result.status).json(result.data);
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
}
