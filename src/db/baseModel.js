const Models = require("./models");
const aliases = require("./aliases");
const relations = require("./relations");

const models = relations(Models);

class baseModel {
    models = models;
    aliases = aliases;
}

module.exports = baseModel;