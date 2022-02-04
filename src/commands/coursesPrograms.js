const User = require('../services/user/index');

module.exports = async (ctx) => {
    const userService = new User();
    const user = await userService.getById(ctx.chat.id);
    if(user) {
        const pathToProgram = `data/programs/${user.course}.png`;
        return ctx.replyWithPhoto({ source: pathToProgram });
    } else {
        await ctx.replyWithPhoto({ source: `data/programs/${process.env.NODE_COURSE}.png` }, { caption: process.env.NODE_COURSE_FORMAT });
        return ctx.replyWithPhoto({ source: `data/programs/${process.env.DATA_COURSE}.png` }, { caption: process.env.DATA_COURSE_FORMAT });
    }
}
