import { Sequelize } from "sequelize";


const credentials = {
    username: 'root',
    password: 'password',
};

const session = new Sequelize('DB_CRAFT', 
credentials.username, credentials.password, {
    host: 'localhost',
    dialect: 'mysql',
});
 
const options = {
    // make table name same as model
    freezeTableName: true, 
};

export { options, session, credentials };