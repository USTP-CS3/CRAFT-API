import { DataTypes } from 'sequelize';
import Database from '../database.js';

const fields = {
  
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    description: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
    },

    room_no: {
        type: DataTypes.STRING(25),
        allowNull: true,
    },

    floor_no: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: true,
    },

    building_no: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: true,
    },

    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
};

const Room = Database.session.define('Room', fields);

export default Room;