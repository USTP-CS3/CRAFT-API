import { Sequelize } from 'sequelize';

/**
 * The user credentials to connect the database
 */
const credentials = {
 database: 'DB_CRAFT',
 username: 'root',
 password: 'root',
};

const options = {
 host: 'localhost',
 dialect: 'mysql',
 define: {
  // disable auto-generated timestamp columns
  timestamps: false,
  // make table names same as model
  freezeTableName: true,
 },
 // Create a pool of connections for improved performance
 pool: {
  max: 10, // Maximum number of connections in pool
  min: 0, // Minimum number of connections in pool
  acquire: 30000, // The maximum time, in milliseconds, that pool will try to get connection before throwing error
  idle: 10000, // The maximum time, in milliseconds, that a connection can be idle before being released
 },
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

/**
 * Synchronize the model with the database
 * @param {Object} options
 */
const synchronize = async (options) => {
 session
  .sync(options)
  .then(() => console.log('Synchronized database successfully! '))
  .catch(() => console.error('Failed synchronizing database:'))
  .finally(() => session.close());
};

const dbConnection = async () => {
 try {
  await session.authenticate();
  console.log('Succesfully connected to the database');
 } catch (error) {
  console.log(error);
 }
};

export { session, credentials, synchronize, dbConnection };
