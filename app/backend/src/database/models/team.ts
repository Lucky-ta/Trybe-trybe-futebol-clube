import { DataTypes, Model } from 'sequelize';
import db from './index';

export default class Team extends Model {
  team_name: string;
}
Team.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  team_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  tableName: 'teams',
  modelName: 'Team',
});
