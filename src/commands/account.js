const User = require('../services/user/index')

module.exports = async (ctx) => {
    const userService = new User();
    const user = await userService.getById(ctx.chat.id);
    const account = await userService.getAccount(user);
    return ctx.replyWithHTML(account);
}
