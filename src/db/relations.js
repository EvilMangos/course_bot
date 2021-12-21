const aliases = require("./aliases");

const relations = (models) => {
    //history associates
    models.users.hasMany(models.transactions, {as: aliases.transactions.tableName});
    models.users.hasMany(models.sessions, {as: aliases.sessions.tableName});

    return models;
}

module.exports = relations;