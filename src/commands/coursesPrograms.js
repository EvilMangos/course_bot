const User = require('../services/user/index');

module.exports = async (ctx) => {
    const userService = new User();
    const user = await userService.getById(ctx.chat.id);

    return ctx.reply('#');
}
