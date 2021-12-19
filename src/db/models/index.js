const {Sequelize} = require("sequelize");

const sequelize = require("../index");
const users = require("./users");
const transactions = require("./transactions");

const Models = {
    users: users(sequelize, Sequelize),
    transactions: transactions(sequelize, Sequelize),
}

module.exports = Models;