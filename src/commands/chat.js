const Course = require('../services/course/index');
const User = require('../services/user/index');
const checkAccess = require('../utils/checkAccess');

module.exports = async (ctx) => {
    const isAccess = await checkAccess(ctx, [process.env.USER, process.env.ADMIN])
    if (!isAccess) return ctx.reply('Access denied');

    const userService = new User();
    const user = await userService.getById(ctx.chat.id);

    const course = new Course();
    const link = await course.getChatLink(user.course);
    return ctx.reply(link);
}
