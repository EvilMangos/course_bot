const Course = require('../services/course/index');
const User = require('../services/user/index');
const checkAccess = require('../utils/checkAccess');

const formatReply = (lessonsList) => {
    let result = `<b>Lessons schedule</b>\n\n`;
    const date = new Date();
    lessonsList.filter((lesson) => lesson.startedAt > date);
    const max = lessonsList.length > 5 ? lessonsList.length : 5;
    for (let i = 0; i < max; i++) {
        result += `
<b>№</b> ${lessonsList[i].number}
<b>Theme:</b> ${lessonsList[i].theme}
<b>Course:</b> ${lessonsList[i].course === process.env.NODE_COURSE ? process.env.NODE_COURSE_FORMAT : process.env.DATA_COURSE_FORMAT}
<b>Date:</b> ${lessonsList[i].startedAt.toLocaleString()}
        `;
    }
    return result
};

module.exports = async (ctx) => {
    const isAccess = await checkAccess(ctx, [process.env.USER_ROLE, process.env.ADMIN_ROLE])
    if (!isAccess) return ctx.reply('Access denied');
    const userService = new User();
    const user = await userService.getById(ctx.chat.id);
    const course = new Course();
    const lessonsList = await course.getLessons(user.course);
    if (lessonsList.length === 0) return  ctx.reply('You have not lessons yet');
    return ctx.replyWithHTML(formatReply(lessonsList));
}
