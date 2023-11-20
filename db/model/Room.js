import { DataTypes } from 'sequelize';
import { session, options } from '../database.js';

const fields = {
  
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    description: {
        type: DataTypes.STRING(50),
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
};

const Room = session.define('Room', fields, options);

export default Room;