import { DataTypes } from 'sequelize';
import Database from '../database.js';

const fields = {
	id: {
		type: DataTypes.STRING(10),
		allowNull: false,
		primaryKey: true,
	},

	first_name: {
		type: DataTypes.STRING(50),
		allowNull: false,
	},

	last_name: {
		type: DataTypes.STRING(50),
		allowNull: false,
	},

	auth_name: {
		type: DataTypes.STRING(50),
		allowNull: false,
	},

	middle_initial: {
		type: DataTypes.CHAR(1),
		allowNull: true,
	},

	age: {
		type: DataTypes.TINYINT.UNSIGNED,
		allowNull: false,
	},

	gender: {
		type: DataTypes.ENUM('M', 'F'),
		allowNull: false,
	},

	year_level: {
		type: DataTypes.ENUM('1', '2', '3', '4', '5'),
		allowNull: false,
	},

	nationality: {
		type: DataTypes.STRING(50),
		allowNull: false,
	},

	department: {
		type: DataTypes.ENUM('CS', 'DS', 'IT', 'TCM'),
		allowNull: false,
	},

	college: {
		type: DataTypes.ENUM('CITC'),
		defaultValue: 'CITC',
		allowNull: false,
	},

	email: {
		type: DataTypes.STRING(50),
		allowNull: false,
		unique: true,
	},

	contact_no: {
		type: DataTypes.CHAR(10),
		allowNull: true,
	},

	created_at: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: DataTypes.NOW,
	},
};

const options = {
	// composite unique constraint
	indexes: [
		{
			fields: ['first_name', 'last_name'],
			unique: true,
		},
	],
};

const Student = Database.session.define('Student', fields, options);

export default Student;
