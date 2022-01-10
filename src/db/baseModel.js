const Models = require("./models");
const aliases = require("./aliases");
const relations = require("./relations");

const models = relations(Models);

class baseModel {
    static models = models;
    static aliases = aliases;
}

module.exports = baseModel;