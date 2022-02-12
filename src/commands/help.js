const Telegram = require('../services/telegram/index');

module.exports = async (ctx) => {
    const telegram = new Telegram();
    return telegram.helpCommand(ctx);
}