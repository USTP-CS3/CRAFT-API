import { DataTypes } from 'sequelize';
import { session, options } from '../database.js';

const fields = {
  
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    last_name: { 
        type: DataTypes.STRING(50),
        allowNull: false
    },

    middle_initial: {
        type: DataTypes.CHAR(1),
        allowNull: true
    },

    age: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false
    },

    gender: {
        type: DataTypes.ENUM('M','F'),
        allowNull: false
    },

    year_level: {
        type: DataTypes.ENUM('1','2','3','4','5'),
        allowNull: false
    },

    nationality: {
        type: DataTypes.STRING(50),
        allowNull: false
    },  

    department: {
        type: DataTypes.ENUM('CS','DS','IT','TCM'),
        allowNull: false
    },

    college: {
        type: DataTypes.ENUM('CITC'),
        defaultValue: 'CITC',
        allowNull: false    
    },

    email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    contact_no: {
        type: DataTypes.CHAR(10),
        allowNull: false
    },
};

const Student = session.define('Student', fields, options);

export default Student;