import Match from '../database/models/match'

export const getAllMatches = async () => {
    const data = await Match.findAll();
    if (data !== null) {
      return { status: 200, data };
    } return { status: 404, data: { message: 'Failed GET' } };
}