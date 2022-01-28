const Models = require("./models");
const aliases = require("./aliases");
const relations = require("./relations");
const sequelize = require('./index');

const models = relations(Models);

class baseModel {
    models = models;
    static aliases = aliases;
    sequelize = sequelize;
}

module.exports = baseModel;
