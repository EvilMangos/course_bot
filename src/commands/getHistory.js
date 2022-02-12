const User = require('../services/user/index');
const checkAccess = require('../utils/checkAccess');

const twoNumberFormat = (time) => {
    return time.toString().length < 2 ? '0' + time.toString() : time;
}

const dateFormat = (date) => {
    const year = twoNumberFormat(date.getFullYear());
    const month = twoNumberFormat(date.getMonth() + 1);
    const day = twoNumberFormat(date.getDate());
    const hours = twoNumberFormat(date.getHours());
    const minutes = twoNumberFormat(date.getMinutes());
    const seconds = twoNumberFormat(date.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const transactionFormat = ({amount, payDate}) => {
    return `date: ${dateFormat(payDate)}\t amount: ${amount}\n\n`;
};

const replyFormat = (history) => {
    let reply = `Transactions count: ${history.length}\n\n`;
    history.forEach(transaction => {
        reply += transactionFormat(transaction);
    })
    return reply;
}

module.exports = async (ctx) => {
    const isAccess = await checkAccess(ctx, [process.env.USER])
    if (!isAccess) return ctx.reply('Access denied');
    const userService = new User();
    const user = await userService.getById(ctx.chat.id);
    const history = await userService.getHistory(user.id);
    return ctx.reply(replyFormat(history));
}
