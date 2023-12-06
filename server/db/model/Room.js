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

	created_at: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: DataTypes.NOW,
	},
};

const Room = Database.session.define('Room', fields);

export default Room;
