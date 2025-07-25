const User = require('../services/user/index');
const {COURSES} = require('../constants');

module.exports = async (ctx) => {
    const userService = new User();
    const user = await userService.getById(ctx.chat.id);
    if(user) {
        const pathToProgram = `data/programs/${user.course}.png`;
        return ctx.replyWithPhoto({ source: pathToProgram });
    } else {
        for (const course of COURSES) {
            await ctx.replyWithPhoto({source: `data/programs/${course.ID}.png`}, {caption: course.FORMAT});
        }
        return null;
    }
}
