/**
 * Run this script to synchronize and create database and tables with sequelized models.
 * Note: This will DELETE all records in the database, gone forever.
 */



import Database from '../database.js';
import Logger   from '../../lib/logger.js';

import Request  from '../model/Request.js';
import Faculty  from '../model/Faculty.js';
import Room     from '../model/Room.js';
import Student  from '../model/Student.js';
import Schedule from '../model/Schedule.js';
import Subject  from '../model/Subject.js';


// (self-executing async function)--------------------------------------------------------------------------

(async function() {
    
    try {
        // Define the relationship between models
        Student  .belongsToMany (Schedule, {through: 'StudentSchedule'});
        Schedule .belongsToMany (Student,  {through: 'StudentSchedule'});
        Student  .hasMany       (Request);
        Request  .belongsTo     (Student);
        Subject  .hasMany       (Schedule);
        Schedule .belongsTo     (Subject);
        Faculty  .hasMany       (Schedule);
        Schedule .belongsTo     (Faculty);
        Room     .hasMany       (Schedule);
        Schedule .belongsTo     (Room);
    }
    catch (error) {
        // If the setup fails, log the error
        Logger.error(`${error.name}: ${error.message}`);
        return;
    }


    try {
        // Test the connection to the database
        const connection = await Database.connection();    

        // Create the database if it does not exist
        await connection.query(`CREATE DATABASE ${Database.credentials.database};`);
        
        // Close the connection to the database
        await connection.close();

        Logger.success(`Successfully created the database.`);
    } 
    catch (error) {
        // If the database already exists, ignore the error
        if (error.name == 'SequelizeDatabaseError') {
            Logger.warn(`Already existing database.`);
        }
        // Otherwise, log the error
        else {
            Logger.error(`${error.name}: ${error.message}`);
            return;
        }
    } 



    try {
        // Synchronize the models with the database
        await Database.synchronize({ force: true });
        Logger.info(JSON.stringify(Database.credentials, null, 4));
        Logger.success('Successfully synchronized models.');
    } 
    catch (error) {
        // If the synchronization fails, log the error
        Logger.error(`${error.name}: ${error.message}`);
        return;
    }


})();