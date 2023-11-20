/**
 * Contains the database object model connection information
 */

import { Sequelize } from "sequelize";


/**
 * The user credentials to the database
 */
const credentials = {
    username: 'root',
    password: 'password',
};


/**
 * The options for the database and models
 */
const options = {
    database: 'DB_CRAFT',
    // make table name same as model
    freezeTableName: true, 
};


/**
 * The session to the database
 * @type {Sequelize}
 */
const session = new Sequelize(options.database, 
credentials.username, credentials.password, {
    host: 'localhost',
    dialect: 'mysql',
});


export { options, session, credentials };