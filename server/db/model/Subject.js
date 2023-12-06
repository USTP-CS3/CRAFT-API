import { DataTypes } from 'sequelize';
import Database from '../database.js';

const fields = {
	id: {
		type: DataTypes.INTEGER.UNSIGNED,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},

	course_code: {
		type: DataTypes.STRING(25),
		unique: true,
		allowNull: false,
	},

	description: {
		type: DataTypes.STRING(50),
		allowNull: false,
	},

	lecture_units: {
		type: DataTypes.TINYINT.UNSIGNED,
		allowNull: false,
	},

	lab_units: {
		type: DataTypes.TINYINT.UNSIGNED,
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
			fields: ['course_code', 'lecture_units', 'lab_units'],
		},
	},
};

const Subject = Database.session.define('Subject', fields, options);

export default Subject;
