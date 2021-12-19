const {Sequelize} = require("sequelize");

const PORT = parseInt(process.env.DB_PORT) || 5432;
const HOST = process.env.DB_HOST || 'localhost';

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: HOST,
        port: PORT,
        define: {
            timestamps: false
        }
    });

module.exports = sequelize;