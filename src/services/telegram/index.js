const baseModel = require('../../db/baseModel');

class Telegram extends baseModel {
    Telegram() {}

    async startCommand(ctx) {
        return ctx.reply('Start Command');
    }

    async helpCommand(ctx) {
        return ctx.reply('Help Command');
    }
}

module.exports = Telegram;