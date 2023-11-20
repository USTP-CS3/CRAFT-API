import { Sequelize } from "sequelize";

import Student  from './model/Student.js';
import Subject  from './model/Subject.js';	
import Schedule from './model/Schedule.js';
import Faculty  from './model/Faculty.js';
import Room     from './model/Room.js';

// global session of the database and models
import { session, credentials } from './connect.js';


// Initialize (self-executing async function)-----------------------------------------------------------------
(async function initialize() {

    await createDatabase();
    await createTables();

})();


async function createDatabase() {

    // Connect to a new session without a database
    const connection = new Sequelize('', 
    credentials.username, credentials.password, {
        host: 'localhost',
        dialect: 'mysql',
    });


    try { // Creates the DB_CRAFT database
        
        await connection.query("CREATE DATABASE `DB_CRAFT`;");
        console.log('Database DB_CRAFT created successfully');

    } 
    
    catch (err) {
        console.log('Failed to create database DB_CRAFT');
    } 
    
    finally {
        // Close the connection without a database
        await connection.close();
    }
}


async function createTables() {

    // define relationships
    Student.belongsToMany(Schedule, {through: 'StudentSchedule'});
    Schedule.belongsToMany(Student, {through: 'StudentSchedule'});

    Subject.hasMany(Schedule);
    Schedule.belongsTo(Subject);

    Faculty.hasMany(Schedule);
    Schedule.belongsTo(Faculty);

    Room.hasMany(Schedule);
    Schedule.belongsTo(Room);


    try { // Sync session to database
        
        await session.sync({ force: true });
        console.log('Tables created successfully!');

    } 
    
    catch (err) {
        console.log('Failed to create tables');
    } 
    
    finally {
        // Close the session with the database
        await session.close();
    }

}
