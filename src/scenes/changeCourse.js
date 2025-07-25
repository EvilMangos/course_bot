const {Scenes} = require('telegraf');
const BaseModel = require('../db/baseModel');
const {SCENES} = require('../constants');
const {createCourseKeyboard} = require("./helpers");
const {getCourseDisplayName} = require("../helpers");

async function updateUserCourse(telegramId, newCourse) {
    const baseModel = new BaseModel();

    const user = await baseModel.models.users.findOne({
        where: {
            telegramId: telegramId
        }
    });

    if (!user) {
        throw new Error('User not found');
    }

    await baseModel.models.users.update(
        {
            course: newCourse
        },
        {
            where: {
                telegramId: user.telegramId
            }
        }
    );

    return user;
}

module.exports = new Scenes.WizardScene(
    SCENES.CHANGE_COURSE,
    async (ctx) => {
        await ctx.reply(
            'Choose a course',
            createCourseKeyboard()
        );
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (!ctx.callbackQuery) {
            await ctx.reply('Changing canceled');
            return ctx.scene.leave();
        }
        try {
            const selectedCourse = ctx.callbackQuery.data;
            const telegramId = ctx.chat.id;

            await updateUserCourse(telegramId, selectedCourse);

            const courseDisplayName = getCourseDisplayName(selectedCourse);

            await ctx.reply(`Now your course is - ${courseDisplayName}`);
        } catch (error) {
            console.error('Error changing course:', error);
            await ctx.reply('An error occurred while changing your course. Please try again.');
        }

        return ctx.scene.leave();
    }
)
