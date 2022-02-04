const setKeyboard = require('../utils/setKeyboard');
const User = require('../services/user/index');

module.exports = async (ctx) => {
    const userService = new User();
    const user = await userService.getById(ctx.chat.id);
    const role = await userService.auth(user ? user.telegramId : ctx.chat.id);
    let text = 'Hello guest';
    if (role !== process.env.GUEST) text = `Hello ${user.lastName} ${user.firstName}`;
    return setKeyboard(ctx, text);
}
