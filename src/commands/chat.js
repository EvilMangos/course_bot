const checkAccess = require('../utils/checkAccess');

module.exports = async (ctx) => {
    const isAccess = await checkAccess(ctx, [process.env.USER_ROLE, process.env.ADMIN_ROLE])
    if (!isAccess) return ctx.reply('Access denied');
    return ctx.reply('#');
}
