const User = require('../services/user/index');

module.exports = async (ctx, requiredRoles) => {
    const userService = new User();
    const role = await userService.auth(ctx.chat.id);
    let result = false;
    requiredRoles.forEach((requiredRole) => {
        if (role === requiredRole) result = true;
    })
    return result;
}
