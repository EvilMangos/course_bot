const checkAccess = require('../utils/checkAccess');

module.exports = async (ctx) => {
    const isAccess = await checkAccess(ctx, [process.env.USER]);
    if (!isAccess) return ctx.reply('Access denied');
    return ctx.scene.enter('change-course');
}
