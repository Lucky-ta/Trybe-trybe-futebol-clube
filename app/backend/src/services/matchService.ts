import Team from '../database/models/team';
import Match from '../database/models/match';

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

const getAllMatches = async (progress: any) => {
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

export default getAllMatches;
