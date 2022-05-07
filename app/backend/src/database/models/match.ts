import { DataTypes, Model } from 'sequelize';
import db from './index';
import Team from './team';

type TeamName = {
  team_name: string;
};

export default class Match extends Model {
  id: number;

  home_team: number;

  home_team_goals: number;

  away_team: number;

  away_team_goals: number;

  in_progress: boolean;

  teamHome?: TeamName;

  teamAway?: TeamName;
}
Match.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  home_team: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  home_team_goals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  away_team: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  away_team_goals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  in_progress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  tableName: 'matches',
  modelName: 'matches',
});

Match.belongsTo(Team, { foreignKey: 'home_team', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'away_team', as: 'teamAway' });

Team.hasMany(Match, { foreignKey: 'id' });
