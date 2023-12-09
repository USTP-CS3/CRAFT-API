import { DataTypes } from 'sequelize';
import Database from '../database.js';

const fields = {
	id: {
		type: DataTypes.INTEGER.UNSIGNED,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},

	section: {
		type: DataTypes.STRING(25),
		allowNull: false,
	},

	start_time: {
		type: DataTypes.TIME,
		allowNull: false,
	},

	end_time: {
		type: DataTypes.TIME,
		allowNull: false,
	},

	day: {
		type: DataTypes.ENUM('M', 'T', 'W', 'Th', 'F', 'S'),
		allowNull: false,
	},

	semester: {
		type: DataTypes.ENUM('1', '2'),
		allowNull: false,
	},

	year: {
		type: DataTypes.CHAR(4),
		allowNull: false,
	},

	created_at: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: DataTypes.NOW,
	},
};

// composite unique constraint
const options = {
	uniqueKeys: {
		unique_schedule: {
			fields: ['section', 'day', 'semester', 'year', 'SubjectId', 'FacultyId', 'RoomId'],
		},
	},
};

const Schedule = Database.session.define('Schedule', fields, options);

export default Schedule;
