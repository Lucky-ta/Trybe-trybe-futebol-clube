import { DataTypes, Model } from 'sequelize';
import db from './index';

type DataValues = {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string
};

export default class User extends Model {
  dataValues: DataValues;

  id: number;

  username: string;

  role: string;

  email: string;

  password: string;

  /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  // static associate(models:any) {
  //   // define association here
  // }
}
User.init({
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  sequelize: db,
  modelName: 'User',
  tableName: 'users',
});
