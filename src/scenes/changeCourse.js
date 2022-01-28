const {Scenes, Markup} = require('telegraf');
const BaseModel = require('../db/baseModel');

module.exports = new Scenes.WizardScene(
    'change-course',
    async (ctx) => {
        await ctx.reply(
            'Choose a course',
            Markup.inlineKeyboard([
                Markup.button.callback('Node.js', process.env.NODE_COURSE),
                Markup.button.callback('Data Engineering', process.env.DATA_COURSE)
            ]).oneTime()
        );
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (!ctx.callbackQuery) {
            await ctx.reply('Changing canceled');
            return ctx.scene.leave();
        }
        const baseModel = new BaseModel();
        const user = await baseModel.models.users.findOne({
            where: {
                telegramId: ctx.chat.id
            }
        });

        await baseModel.models.users.update({
            course: ctx.callbackQuery.data
        }, {
            where: {
                telegramId: user.telegramId
            }
        })

        await ctx.reply(`Now you course is - ${
            ctx.callbackQuery.data === process.env.NODE_COURSE? process.env.NODE_COURSE_FORMAT: process.env.DATA_COURSE_FORMAT 
        }`);
        return ctx.scene.leave();
    }
)
