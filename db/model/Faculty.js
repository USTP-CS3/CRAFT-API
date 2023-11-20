import { DataTypes } from 'sequelize';
import { sequelize, options } from '../db/connect.js';

const fields = {
  
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
};

const Faculty = sequelize.define('Faculty', fields, options);

export default Faculty;