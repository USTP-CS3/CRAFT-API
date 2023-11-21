/**
 * Run this script to force sync the database and tables from the models
 * Note: This will DELETE all records in the database
 */

import { Sequelize } from "sequelize";

import Student  from '../model/Student.js';
import Subject  from '../model/Subject.js';	
import Schedule from '../model/Schedule.js';
import Faculty  from '../model/Faculty.js';
import Room     from '../model/Room.js';

import { credentials } from "../database.js";
import { synchronize } from "./database.js";


// (self-executing async function)--------------------------------------------------------------------
(async function() {

    relationship();
    await database();
    await synchronize({
        force: true
    });

})();


// Functions------------------------------------------------------------------------------------------

/**
 * Define model relationships
 */
function relationship() {
    Student.belongsToMany(Schedule, {through: 'StudentSchedule'});
    Schedule.belongsToMany(Student, {through: 'StudentSchedule'});

    Subject.hasMany(Schedule);
    Schedule.belongsTo(Subject);

    Faculty.hasMany(Schedule);
    Schedule.belongsTo(Faculty);

    Room.hasMany(Schedule);
    Schedule.belongsTo(Room);
}


/**
 * Establish connection and create database if not exists
 */
async function database() {
    
    // Create a new session without a database
    const connection = new Sequelize('', 
    credentials.username, credentials.password, {
        host: 'localhost',
        dialect: 'mysql',
    });

    try {                
        // Creates the DB_CRAFT database
        await connection.query(`CREATE DATABASE ${credentials.database};`);
        console.log('Database DB_CRAFT created successfully');
    } 
    catch (err) {
        console.log(`Failed to create database ${credentials.database}`);
    } 
    finally {
        // Close the connection
        await connection.close();
    }    

}