const User = require('../services/user/index')
const checkAccess = require("../utils/checkAccess");
const {Markup} = require("telegraf");
const {ROLES} = require("../constants");

module.exports = async (ctx) => {
    const isAccess = await checkAccess(ctx, [ROLES.USER]);
    if (!isAccess) return ctx.reply('Access denied');
    const userService = new User();
    const user = await userService.getById(ctx.chat.id);
    const account = await userService.getAccount(user);
    return ctx.replyWithHTML(account,
        Markup.inlineKeyboard([
            Markup.button.callback('Edit name', 'edit_name'),
            Markup.button.callback('Edit email', 'edit_email')
        ]).oneTime());
}
