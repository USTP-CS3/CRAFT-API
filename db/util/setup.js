/**
 * Run this script to synchronize and create database and tables with sequelized models.
 * Note: This will DELETE all records in the database, gone forever.
 */


import Logger from '../../lib/logger.js';

import { Sequelize } from 'sequelize';

import Student  from '../model/Student.js';
import Subject  from '../model/Subject.js';
import Schedule from '../model/Schedule.js';
import Faculty  from '../model/Faculty.js';
import Room     from '../model/Room.js';

import { credentials, options, synchronize } from '../database.js';

// (self-executing async function)--------------------------------------------------------------------------

(async function() {
    

    try {
    
        // Define the relationship between models
        
        Student.belongsToMany(Schedule, {through: 'StudentSchedule'});
        Schedule.belongsToMany(Student, {through: 'StudentSchedule'});
    
        Subject.hasMany(Schedule);
        Schedule.belongsTo(Subject);
    
        Faculty.hasMany(Schedule);
        Schedule.belongsTo(Faculty);
    
        Room.hasMany(Schedule);
        Schedule.belongsTo(Room);
    
    }
    catch (error) {
        
        // If the association fails, log the error

        Logger.error(`${error.name}: ${error.message}`);
        return;

    }

    let connection; // the connection to the database

    try {
    
        // Test the connection to the database

        connection = new Sequelize('', 
            credentials.username, 
            credentials.password, 
            options
        );
        await connection.authenticate();        
    
    }
    catch (error) {
        
        // If the connection fails, log the error
        Logger.info(JSON.stringify(credentials, null, 4));
        Logger.error(`${error.name}: ${error.message}`);
        return;

    }

    try {

        // Create the database if it does not exist

        await connection.query(`CREATE DATABASE ${credentials.database};`);
        
        // Close the connection to the database
        await connection.close();

        Logger.success(`Successfully created the database ${credentials.database}.`);
    
    } 
    catch (error) {

        // If the database already exists, ignore the error

        if (error.name == 'SequelizeDatabaseError') {
            Logger.warn(`The database ${credentials.database} already exists.`);
        }

        // Otherwise, log the error

        else {
            Logger.error(`${error.name}: ${error.message}`);
            return;
        }
    } 

    try {

        // Synchronize the models with the database

        await synchronize({ force: true });
        Logger.info(JSON.stringify(credentials, null, 4));
        Logger.success('Successfully synchronized models to database.');
    
    } 
    catch (error) {
    
        // If the synchronization fails, log the error

        Logger.error(`${error.name}: ${error.message}`);
        return;
    
    }

})();