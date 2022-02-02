const User = require('../services/user/index')
const checkAccess = require("../utils/checkAccess");

module.exports = async (ctx) => {
    const isAccess = await checkAccess(ctx, [process.env.USER]);
    if (!isAccess) return ctx.reply('Access denied');
    const userService = new User();
    const user = await userService.getById(ctx.chat.id);
    const account = await userService.getAccount(user);
    return ctx.replyWithHTML(account);
}
