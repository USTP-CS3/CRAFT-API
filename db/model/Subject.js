import { DataTypes } from 'sequelize';
import { session, options } from '../database.js';

const fields = {
  
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    course_code: {
        type: DataTypes.STRING(25),
        allowNull: false
    },

    description: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    lecture_units: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false
    },

    lab_units: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false
    },
};

const Subject = session.define('Subject', fields, options);

export default Subject;