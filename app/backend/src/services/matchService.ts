import Team from '../database/models/team';
import Match from '../database/models/match';

export type PostMatchParam = {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
};

const formatMatchesData = (matches: Match[]) => {
  const result = matches.map((match) => ({
    id: match.id,
    homeTeam: match.home_team,
    homeTeamGoals: match.home_team_goals,
    awayTeam: match.away_team,
    awayTeamGoals: match.away_team_goals,
    inProgress: match.in_progress,
    teamHome: { teamName: match.teamHome?.team_name },
    teamAway: { teamName: match.teamAway?.team_name },
  }));
  return result;
};

const formatNewMatchData = (match: Match) => {
  const data = {
    id: match.id,
    homeTeam: match.home_team,
    awayTeam: match.away_team,
    homeTeamGoals: match.home_team_goals,
    awayTeamGoals: match.away_team_goals,
    inProgress: match.in_progress,
  };
  return data;
};

const findAllMatches = async () => {
  const result = await Match.findAll({
    include: [
      { model: Team, required: true, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Team, required: true, as: 'teamAway', attributes: { exclude: ['id'] } },
    ],
  });
  const data = formatMatchesData(result);

  return { status: 200, data };
};

export const getAllMatches = async (progress: any) => {
  if (progress !== undefined) {
    const parsedProgress = JSON.parse(progress);
    const result = await Match.findAll({ where: { in_progress: parsedProgress },
      include: [
        { model: Team, required: true, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, required: true, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    const data = formatMatchesData(result);
    return { status: 200, data };
  }
  return findAllMatches();
};

export const postMatches = async (match: PostMatchParam) => {
  try {
    const homeTeam = await Team.findByPk(match.homeTeam);
    const awayTeam = await Team.findByPk(match.awayTeam);
    if (homeTeam === null || awayTeam === null) {
      return { status: 404, data: { message: 'There is no team with such id!' } };
    }
    const result = await Match.create({
      home_team: match.homeTeam,
      home_team_goals: match.homeTeamGoals,
      away_team: match.awayTeam,
      away_team_goals: match.awayTeamGoals,
      in_progress: match.inProgress,
    });

    const data = formatNewMatchData(result);
    return { status: 201, data };
  } catch (e: any) {
    return { status: 404, data: e.message };
  }
};

export const updateMatchStatus = async (id: number) => {
  try {
    const data = await Match.update(
      { in_progress: false },
      { where: { id } },
    );
    return { status: 200, data };
  } catch (e: any) {
    return { status: 401, data: e.message };
  }
};

type UpdateMatchParams = {
  homeTeamGoals: number;
  awayTeamGoals: number
}

export const updateMatch = async(id: number, body: UpdateMatchParams) => {
  try {
    const data = await Match.update(
      {home_team_goals: body.homeTeamGoals,
      away_team_goals: body.awayTeamGoals},
      {where: { id }}
    );
    return { status: 200, data }
  } catch (e: any) {
    return { status: 200, data: e.message }
  }
}