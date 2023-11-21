import { Sequelize } from "sequelize";

/**
 * The user credentials to connect the database 
 */
const credentials = {
    database: 'DB_CRAFT',
    username: 'root',
    password: 'password',
};

/**
 * The connection options of the model to the database
 */
const options = {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false,     // disable auto-generated timestamp columns
        freezeTableName: true, // make table names same as model
    }
};


/**
 * The session object to the database
 * @type {Sequelize}
 */
const session = new Sequelize(
    credentials.database, 
    credentials.username, 
    credentials.password, 
    options
);


/**
 * Synchronize the model with the database
 * @param {Object} options 
 */
const synchronize = async function(options) {

    await session.sync(options);
    await session.close();

};

export { session, options, credentials, synchronize };