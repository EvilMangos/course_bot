const {Sequelize} = require("sequelize");

const sequelize = require("../index");
const users = require("./users");
const transactions = require("./transactions");
const sessions = require("./sessions");

const Models = {
    users: users(sequelize, Sequelize),
    transactions: transactions(sequelize, Sequelize),
    sessions: sessions(sequelize, Sequelize),
}

module.exports = Models;