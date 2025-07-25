const {Sequelize} = require("sequelize");
const EnvService = require("../services/env");

const sequelize = new Sequelize(EnvService.getDatabaseConfigs().url, {
    dialect: 'postgres',
    define: {
        timestamps: false
    }
});

module.exports = sequelize;
