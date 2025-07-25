const User = require('../services/user/index');
const checkAccess = require('../utils/checkAccess');
const {ROLES} = require("../constants");
const EnvService = require("../services/env");

module.exports = async (ctx) => {
    const isAccess = await checkAccess(ctx, [ROLES.USER])
    if (!isAccess) return ctx.reply('Access denied');
    const userService = new User();
    const user = await userService.getById(ctx.chat.id);
    const history = await userService.getHistory(user.id);
    if (history.length > 2) return ctx.reply('The course is fully paid');

    const {liqpayKey, price} = EnvService.getPaymentConfigs();

    const invoice = {
        chat_id: ctx.chat.id,
        title: 'Course payment',
        description: `Your balance: ${user.balance} UAH`,
        payload: {
            unique_id: `${ctx.chat.id}_${Number(new Date())}`
        },
        provider_token: liqpayKey,
        start_parameter: 'start',
        currency: 'UAH',
        prices: JSON.stringify([{label: 'Course price', amount: price * 100}])
    };
    return ctx.replyWithInvoice(invoice);
}
