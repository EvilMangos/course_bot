const checkAccess = require('../utils/checkAccess');
const {ROLES} = require("../constants");

module.exports = async ctx => {
    const isAccess = await checkAccess(ctx, [ROLES.GUEST])
    if (!isAccess) return ctx.reply('Access denied');
    return ctx.scene.enter('sign-up');
}
