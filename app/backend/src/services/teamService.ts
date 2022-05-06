import Team from '../database/models/team';

export const getAllTeams = async () => {
  const data = await Team.findAll();
  if (data !== null) {
    return { status: 200, data };
  } return { status: 404, data: { message: 'Failed GET' } };
};

export const getTeamById = async (id: number) => {
  const data = await Team.findOne({ where: { id } });

  if (data !== null) {
    return { status: 200, data };
  } return { status: 404 };
};
