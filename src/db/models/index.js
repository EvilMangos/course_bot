const {Sequelize} = require("sequelize");

const sequelize = require("../index");
const users = require("./users");
const transactions = require("./transactions");
const lessons = require("./lessons");

const Models = {
    users: users(sequelize, Sequelize),
    transactions: transactions(sequelize, Sequelize),
    lessons: lessons(sequelize, Sequelize)
}

module.exports = Models;
