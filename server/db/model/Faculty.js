import { DataTypes } from 'sequelize';
import Database from '../database.js';

const fields = {
  
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
    },

    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
};

const Faculty = Database.session.define('Faculty', fields);

export default Faculty;