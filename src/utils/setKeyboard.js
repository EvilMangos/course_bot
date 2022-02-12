const User = require('../services/user/index');
const keyboardData = require('./keyboardData.json');

module.exports = async (ctx, text = `Hello guest`) => {
    const user = new User();
    const role = await user.auth(ctx.chat.id);
    return ctx.telegram.sendMessage(ctx.chat.id, text,{
        reply_markup: {
            resize_keyboard: true,
            keyboard: keyboardData[role]
        }
    });
}
