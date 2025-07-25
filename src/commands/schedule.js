const Course = require('../services/course/index');
const User = require('../services/user/index');
const checkAccess = require('../utils/checkAccess');
const {ROLES} = require("../constants");
const {getCourseDisplayName} = require("../helpers");

const formatReply = (lessonsList) => {
    let result = `<b>Lessons schedule</b>\n\n`;
    const date = new Date();
    lessonsList.filter((lesson) => lesson.startedAt > date);
    const max = lessonsList.length > 5 ? lessonsList.length : 5;
    for (let i = 0; i < max; i++) {
        result += `
<b>№</b> ${lessonsList[i].number}
<b>Theme:</b> ${lessonsList[i].theme}
<b>Course:</b> ${getCourseDisplayName(lessonsList[i].course)}
<b>Date:</b> ${lessonsList[i].startedAt.toLocaleString()}
        `;
    }
    return result
};

module.exports = async (ctx) => {
    const isAccess = await checkAccess(ctx, [ROLES.USER, ROLES.ADMIN])
    if (!isAccess) return ctx.reply('Access denied');
    const userService = new User();
    const user = await userService.getById(ctx.chat.id);
    const course = new Course();
    const lessonsList = await course.getLessons(user.course);
    if (lessonsList.length === 0) return  ctx.reply('You have not lessons yet');
    return ctx.replyWithHTML(formatReply(lessonsList));
}
