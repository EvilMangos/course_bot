const {Telegraf} = require('telegraf');
const EnvService = require('./services/env');

module.exports = new Telegraf(EnvService.getBotConfigs().token);
