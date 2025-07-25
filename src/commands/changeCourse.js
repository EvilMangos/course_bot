const checkAccess = require('../utils/checkAccess');
const {ROLES} = require("../constants");

module.exports = async (ctx) => {
    const isAccess = await checkAccess(ctx, [ROLES.USER]);
    if (!isAccess) return ctx.reply('Access denied');
    return ctx.scene.enter('change-course');
}
