import { Sequelize, Model } from 'sequelize';
import * as config from '../config/database';

export {
    Model
}
export default new Sequelize(config);
