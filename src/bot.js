const {Telegraf} = require('telegraf');

module.exports = new Telegraf(process.env.BOT_TOKEN);
