const BaseModel = require('../db/baseModel');
const User = require('../services/user/index');

module.exports = async (ctx) => {
    const userService = new User();
    const user = await userService.getById(ctx.chat.id);
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
        prices: JSON.stringify([{label: 'Course', amount: 280000}])
    };
    return ctx.replyWithInvoice(invoice);
}
