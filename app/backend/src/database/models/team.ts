'use strict';

import { Model } from './index'

module.exports = (sequelize: any, DataTypes: any) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      Team.hasMany(models.Match, {
        foreignKey: 'id', as: 'matches'
      })
    }
  };
  Team.init({
    team_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};