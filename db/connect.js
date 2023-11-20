import { Sequelize } from "sequelize";

const session = {
    username: 'root',
    password: 'password',
};

const sequelize = new Sequelize('DB_CRAFT', 
session.username, session.password, {
    host: 'localhost',
    dialect: 'mysql',
}); 

const options = {
    freezeTableName: true, // table name will be same as model name
};

export {sequelize, options, session};