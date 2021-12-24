const baseModel = require('../../db/baseModel');

const data = require('./data')

class Telegram extends baseModel {
    Telegram() {}

    async startCommand(ctx) {
        return ctx.reply('Start Command');
    }

    async helpCommand(ctx) {
        return ctx.reply(data.helpInfo);
    }
}

module.exports = Telegram;