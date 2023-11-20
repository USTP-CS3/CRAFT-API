import { Sequelize } from "sequelize";

/**
 * The user credentials to connect the database
 */
const credentials = {
    database: 'DB_CRAFT',
    username: 'root',
    password: 'password',
};

const options = {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        // disable auto-generated timestamp columns
        timestamps: false,
        // make table names same as model
        freezeTableName: true,
    }
};


/**
 * The session to the database
 * @type {Sequelize}
 */
const session = new Sequelize(
    credentials.database, 
    credentials.username, 
    credentials.password, 
    options
);


export { session, credentials };