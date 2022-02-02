const checkAccess = require('../utils/checkAccess');

module.exports = async ctx => {
    const isAccess = await checkAccess(ctx, [process.env.GUEST])
    if (!isAccess) return ctx.reply('Access denied');
    return ctx.scene.enter('sign-up');
}
