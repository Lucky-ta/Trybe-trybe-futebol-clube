import { Response, Request } from 'express';
import { getAllTeams } from '../services/teamService';

export const listTeams = async (_req: Request, res: Response) => {
    try {
        const result = await getAllTeams();
        return res.status(result.status).json(result.data)
    } catch (e: any) {
        return res.status(500).json(e.message)
    }
}