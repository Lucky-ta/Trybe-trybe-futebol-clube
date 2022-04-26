import { DataTypes, Model } from 'sequelize';
import db from './index';

class Team extends Model {
  team_name: string;

  /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  static associate(models: any) {
    // define association here
    Team.hasMany(models.Match, {
      foreignKey: 'id', as: 'matches',
    });
  }
}
Team.init({
  team_name: DataTypes.STRING,
}, {
  sequelize: db,
  tableName: 'users',
  modelName: 'teams',
});
