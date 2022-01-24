const Telegram = require('../services/telegram/index');
const setKeyboard = require('../utils/setKeyboard');

module.exports = async (ctx) => {
    const telegram = new Telegram();
    await setKeyboard(ctx);
    return telegram.startCommand(ctx);
}
