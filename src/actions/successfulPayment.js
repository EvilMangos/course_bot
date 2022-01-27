const User = require('../services/user/index');

module.exports = async (ctx) => {
    const userService = new User();
    const user = await userService.getById(ctx.chat.id);
    user.balance += 2800;
    await userService.createTransaction({
        userId: user.id,
        amount: 2800,
        payDate: ctx.message.date * 1000
    });
    await userService.update(user);
    return ctx.reply('Payment was successful. Thanks)');
}
