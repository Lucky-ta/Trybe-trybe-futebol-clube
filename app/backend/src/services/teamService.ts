import Team from '../database/models/team';

const formatTeamsData = (Teams: Team[]) => {
  const data = Teams.map((team) => ({
    id: team.id,
    teamName: team.team_name,
  }));
  return data;
};

export const getAllTeams = async () => {
  const result = await Team.findAll();

  const data = formatTeamsData(result);

  if (result !== null) {
    return { status: 200, data };
  } return { status: 404, data: { message: 'Failed GET' } };
};

export const getTeamById = async (id: number) => {
  const result: Team = await <any>Team.findOne({ where: { id } });
  const data = {
    id: result.id,
    teamName: result.team_name,
  };

  if (result !== null) {
    return { status: 200, data };
  } return { status: 404 };
};
