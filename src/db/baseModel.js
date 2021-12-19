const Models = require("./models");
const aliases = require("./aliases");
const relations = require("./relations");

class baseModel {
    models = relations(Models);
    aliases = aliases;
}

module.exports = baseModel;