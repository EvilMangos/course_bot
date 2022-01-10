const {Scenes, Markup} = require('telegraf');
const authValidator = require('../utils/authValidation');
const User = require('../services/user/index');

module.exports = new Scenes.WizardScene(
    'sign-up',
    async (ctx) => {
        await ctx.reply('Enter your first name:');
        return ctx.wizard.next();
    },
    async (ctx) => {
        ctx.wizard.state.telegramId = ctx.message.chat.id;
        if (!ctx.wizard.state.firstname && authValidator.name(ctx.message.text)) {
            ctx.wizard.state.firstname = ctx.message.text;
        } else if (!ctx.wizard.state.firstname) {
            ctx.wizard.back();
            return ctx.wizard.steps[ctx.wizard.cursor](ctx);
        }
        await ctx.reply('Enter your last name:');
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (!ctx.wizard.state.lastname && authValidator.name(ctx.message.text)) {
            ctx.wizard.state.lastname = ctx.message.text;
        } else if (!ctx.wizard.state.lastname) {
            ctx.wizard.back();
            return ctx.wizard.steps[ctx.wizard.cursor](ctx);
        }
        await ctx.reply('Enter you Microsoft Teams e-mail address:');
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (!ctx.wizard.state.email && authValidator.email(ctx.message.text)) {
            ctx.wizard.state.email = ctx.message.text;
        } else if (!ctx.wizard.state.email) {
            ctx.wizard.back();
            return ctx.wizard.steps[ctx.wizard.cursor](ctx);
        }
        await ctx.reply(
            'Choose a course',
            Markup.inlineKeyboard([
                Markup.button.callback('Node.js', process.env.NODE_COURSE),
                Markup.button.callback('Data Engineering', process.env.DATA_COURSE)
            ]).oneTime()
        );

        return ctx.wizard.next()
    },
    async (ctx) => {
        ctx.wizard.state.course = ctx.callbackQuery.data;
        const user = new User();
        await user.signUp(ctx.wizard.state);
        await ctx.reply('Thanks for registration');
        return ctx.scene.leave();
    }
)