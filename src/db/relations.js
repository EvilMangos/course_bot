const aliases = require("./aliases");

const relations = (models) => {
    //history associates
    models.users.hasMany(models.transactions, {as: aliases.transactions.tableName});

    return models;
}

module.exports = relations;