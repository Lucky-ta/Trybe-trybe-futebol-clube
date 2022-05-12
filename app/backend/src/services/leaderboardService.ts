import { getAllMatches } from './matchService';
import { getAllTeams } from './teamService';

type TeamsVictory = {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome: {
    teamName: string
  };
  teamAway: {
    teamName: string
  };
};

const calculateTotalGames = async (teamName: string) => {
  const { data } = await <any>getAllMatches(false);
  const homeResult = data.filter((match: TeamsVictory) => match.teamHome.teamName === teamName);

  const awayResult = data.filter((match: TeamsVictory) => match.teamAway.teamName === teamName);
  return homeResult.length + awayResult.length;
};

const calculateTotalPoints = async (teamName: string) => {
  const { data } = await <any>getAllMatches(false);

  const homeTeamPoints = data.filter((match: TeamsVictory) => match
    .homeTeamGoals > match.awayTeamGoals
        && match.teamHome.teamName === teamName);

  const awayTeamPoints = data.filter((match: TeamsVictory) => match
    .homeTeamGoals < match.awayTeamGoals
        && match.teamAway.teamName === teamName);

  const drawPoints = data.filter((match: TeamsVictory) => (match
    .homeTeamGoals === match.awayTeamGoals)
        && ((match.teamHome.teamName === teamName) || (match.teamAway.teamName === teamName)));
  const result = (homeTeamPoints.length * 3) + (awayTeamPoints.length * 3) + (drawPoints.length);
  return result;
};

const victories = async (teamName: string) => {
  const { data } = await <any>getAllMatches(false);

  const homeTeamVictory = data.filter((match: TeamsVictory) => (match
    .homeTeamGoals > match.awayTeamGoals)
        && (match.teamHome.teamName === teamName));

  const awayTeamVictory = data.filter((match: TeamsVictory) => (match
    .homeTeamGoals < match.awayTeamGoals)
        && (match.teamAway.teamName === teamName));
  return homeTeamVictory.length + awayTeamVictory.length;
};

const draws = async (teamName: string) => {
  const { data } = await <any>getAllMatches(false);

  const draw = data.filter((match: TeamsVictory) => (match.homeTeamGoals === match.awayTeamGoals)
        && ((match.teamHome.teamName === teamName) || (match.teamAway.teamName === teamName)));
  return draw.length;
};

const losses = async (teamName: string) => {
  const { data } = await <any>getAllMatches(false);

  const homeTeamVictory = data.filter((match: TeamsVictory) => match
    .homeTeamGoals < match.awayTeamGoals
        && (match.teamHome.teamName === teamName));

  const awayTeamVictory = data.filter((match: TeamsVictory) => match
    .homeTeamGoals > match.awayTeamGoals
        && (match.teamAway.teamName === teamName));
  return homeTeamVictory.length + awayTeamVictory.length;
};

const goalsFavor = async (teamName: string) => {
  let homeGoals = 0;
  let awayGoals = 0;
  const { data } = await <any>getAllMatches(false);

  const favorTeamsGoals = data.filter((match: TeamsVictory) => match
    .teamHome.teamName === teamName);
  const favorAwayTeamsGoals = data.filter((match: TeamsVictory) => match
    .teamAway.teamName === teamName);
  favorTeamsGoals.forEach((team: any) => {
    homeGoals += team.homeTeamGoals;
  });
  favorAwayTeamsGoals.forEach((team: any) => {
    awayGoals += team.awayTeamGoals;
  });
  return homeGoals + awayGoals;
};

const goalsOwn = async (teamName: string) => {
  let homeGoals = 0;
  let awayGoals = 0;
  const { data } = await <any>getAllMatches(false);

  const favorTeamsGoals = data.filter((match: TeamsVictory) => match
    .teamHome.teamName === teamName);
  const favorAwayTeamsGoals = data.filter((match: TeamsVictory) => match
    .teamAway.teamName === teamName);
  favorTeamsGoals.forEach((team: any) => {
    homeGoals += team.awayTeamGoals;
  });
  favorAwayTeamsGoals.forEach((team: any) => {
    awayGoals += team.homeTeamGoals;
  });
  return homeGoals + awayGoals;
};

const formatData = (name: string, functions: any) => ({
  name,
  totalPoints: functions.totalPoints,
  totalGames: functions.totalGames,
  totalVictories: functions.totalVictories,
  totalDraws: functions.totalDraws,
  totalLosses: functions.totalLosses,
  goalsFavor: functions.totalGoalsFavor,
  goalsOwn: functions.totalGoalsOwn,
  goalsBalance: functions.totalGoalsFavor + functions.totalGoalsOwn,
  efficiency: Number(functions.efficiency),
});

const resultArray = async () => {
  const { data } = await <any>getAllTeams();

  const result = data.map(async (team: any) => {
    const totalGames = await calculateTotalGames(team.teamName);
    const totalPoints = await calculateTotalPoints(team.teamName);
    const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);

    const functions = { totalGames,
      totalPoints,
      efficiency,
      totalVictories: await victories(team.teamName),
      totalDraws: await draws(team.teamName),
      totalLosses: await losses(team.teamName),
      totalGoalsFavor: await goalsFavor(team.teamName),
      totalGoalsOwn: await goalsOwn(team.teamName) };

    return formatData(team.teamName, functions);
  });
  return Promise.all(result);
};

function compare(a: any, b: any) {
  if (a.totalPoints < b.totalPoints) {
    return 1;
  }
  if (a.totalPoints > b.totalPoints) {
    return -1;
  }
  return 0;
}

function secondCompare(a: any, b: any) {
  if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
  if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
  if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
  if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
  return b.goalsOwn - a.goalsOwn;
}

const filterLeaderboard = async () => {
  const data = await <any>resultArray();

  const sortedData = data.sort(compare)
    .sort(secondCompare);

  return { status: 200, data: sortedData };
};

export default filterLeaderboard;
