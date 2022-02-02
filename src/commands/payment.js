const User = require('../services/user/index');
const checkAccess = require('../utils/checkAccess');

module.exports = async (ctx) => {
    const isAccess = await checkAccess(ctx, [process.env.USER])
    if (!isAccess) return ctx.reply('Access denied');
    const userService = new User();
    const user = await userService.getById(ctx.chat.id);
    const history = await userService.getHistory(user.id);
    if (history.length > 2) return ctx.reply('The course is fully paid');

    const invoice = {
        chat_id: ctx.chat.id,
        title: 'Course payment',
        description: `Your balance: ${user.balance}`,
        payload: {
            unique_id: `${ctx.chat.id}_${Number(new Date())}`
        },
        provider_token: process.env.LIQPAY_KEY,
        start_parameter: 'start',
        currency: 'UAH',
        prices: JSON.stringify([{label: 'Course price', amount: process.env.PRICE}])
    };
    return ctx.replyWithInvoice(invoice);
}
