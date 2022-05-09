import { NextFunction, Request, Response } from 'express';
import { PostMatchParam } from '../services/matchService';

const validateTeams = (req: Request, res: Response, next: NextFunction) => {
  const match: PostMatchParam = req.body;
  if (match.homeTeam === match.awayTeam) {
    return res.status(401)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  next();
};

export default validateTeams;
