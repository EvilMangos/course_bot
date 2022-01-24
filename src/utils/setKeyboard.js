const User = require('../services/user/index');
const keyboardData = require('./keyboardData.json');

module.exports = async (ctx) => {
    const user = new User();
    const role = await user.auth(ctx.chat.id);
    return ctx.telegram.sendMessage(ctx.chat.id, `Hello ${role}`,{
        reply_markup: {
            resize_keyboard: true,
            keyboard: keyboardData[role]
        }
    });
}
