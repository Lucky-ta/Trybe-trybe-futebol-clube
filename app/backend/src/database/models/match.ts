import { DataTypes, Model } from 'sequelize';
import db from './index';

class Match extends Model {
  /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  static associate(models: any) {
    // define association here
    Match.belongsTo(models.Team);
  }
}
Match.init({
  home_team: DataTypes.NUMBER,
  home_team_goals: DataTypes.NUMBER,
  away_team: DataTypes.NUMBER,
  away_team_goals: DataTypes.NUMBER,
  in_progress: DataTypes.BOOLEAN,
}, {
  sequelize: db,
  tableName: 'matches',
  modelName: 'Match',
});
