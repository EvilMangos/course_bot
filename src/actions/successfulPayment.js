const BaseModel = require('../db/baseModel');
const User = require('../services/user/index');

module.exports = async (ctx) => {
    const userService = new User();
    const user = await userService.getById(ctx.chat.id);
    user.balance += 2800;
    await userService.update(user);
    return ctx.reply('SuccessfulPayment')
}
