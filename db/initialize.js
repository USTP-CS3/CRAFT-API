import { Sequelize } from "sequelize";

import Student  from '../model/Student.js';
import Subject  from '../model/Subject.js';	
import Schedule from '../model/Schedule.js';
import Faculty  from '../model/Faculty.js';
import Room     from '../model/Room.js';

import { session } from './connect.js';



// define relationships
Student.belongsToMany(Schedule, {through: 'StudentSchedule'});
Schedule.belongsToMany(Student, {through: 'StudentSchedule'});

Subject.hasMany(Schedule);
Schedule.belongsTo(Subject);

Faculty.hasMany(Schedule);
Schedule.belongsTo(Faculty);

Room.hasMany(Schedule);
Schedule.belongsTo(Room);



// make a connection without a database
new Sequelize('', session.username, session.password, {
    host: 'localhost',
    dialect: 'mysql',
})

// creates the DB_CRAFT database
.query("CREATE DATABASE `DB_CRAFT`;")

.then(data => {
    console.log('Database DB_CRAFT created successfully');
})

// close the connection without a database
.close();



// make a connection with the database
new Sequelize('DB_CRAFT', session.username, session.password, {
    host: 'localhost',
    dialect: 'mysql',
})

// sync model to database
.sync({force: true})

.then((result) => {
    console.log("Tables created successfully!");
    console.log(result);
})

.catch((err) => {
    console.log(err);
});

