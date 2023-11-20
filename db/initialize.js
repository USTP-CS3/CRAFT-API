/**
 * Run this script to force sync the database and tables from the models
 * Note: This will DELETE all records in the database
 */

import { Sequelize } from "sequelize";

import Student  from './model/Student.js';
import Subject  from './model/Subject.js';	
import Schedule from './model/Schedule.js';
import Faculty  from './model/Faculty.js';
import Room     from './model/Room.js';

import { options, session, credentials } from "./database.js";


// (self-executing async function)--------------------------------------------------------------------
(async function() {

    setModelRelationship();
    await createDatabase();
    await syncTableModel();

})();


// Functions------------------------------------------------------------------------------------------

function setModelRelationship() {
    // define relationships
    Student.belongsToMany(Schedule, {through: 'StudentSchedule'});
    Schedule.belongsToMany(Student, {through: 'StudentSchedule'});

    Subject.hasMany(Schedule);
    Schedule.belongsTo(Subject);

    Faculty.hasMany(Schedule);
    Schedule.belongsTo(Faculty);

    Room.hasMany(Schedule);
    Schedule.belongsTo(Room);
}


async function createDatabase() {
    
    // Create a new session without a database
    const connection = new Sequelize('', 
    credentials.username, credentials.password, {
        host: 'localhost',
        dialect: 'mysql',
    });

    try {                
        // Creates the DB_CRAFT database
        await connection.query(`CREATE DATABASE ${options.database};`);
        console.log('Database DB_CRAFT created successfully');
    } 
    catch (err) {
        console.log(`Failed to create database ${options.database}`);
    } 
    finally {
        // Close the connection
        await connection.close();
    }    

}


async function syncTableModel() {
    
    try { 
        // Sync session to database
        await session.sync({ force: true });
        console.log('Tables created successfully!');
    } 
    catch (err) {
        console.log('Failed to create tables');
    } 
    finally {
        // Close the session
        await session.close();
    }
}