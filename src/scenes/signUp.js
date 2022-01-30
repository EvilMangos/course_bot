const {Scenes, Markup} = require('telegraf');
const authValidator = require('../utils/authValidation');
const User = require('../services/user/index');
const setKeyboard = require('../utils/setKeyboard');
const keyboardData = require('../utils/keyboardData.json');

const defaultKeyboard = async (ctx) => {
    await ctx.telegram.sendMessage(ctx.chat.id, 'Sign up is canceled', {
        reply_markup: {
            resize_keyboard: true,
            keyboard: keyboardData.guest
        }
    });
    return ctx.scene.leave();
}

module.exports = new Scenes.WizardScene(
    'sign-up',
    async (ctx) => {
        await ctx.telegram.sendMessage(ctx.chat.id, 'SignUp', {
            reply_markup: {
                resize_keyboard: true,
                keyboard: [
                    [
                        {text: 'Cancel'}
                    ]
                ]
            }
        });
        await ctx.reply('Enter your first name:');
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (ctx.message.text === 'Cancel') return defaultKeyboard(ctx)
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
        if (ctx.message.text === 'Cancel') return defaultKeyboard(ctx)
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
        if (ctx.message.text === 'Cancel') return defaultKeyboard(ctx)
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
        if (ctx.message && ctx.message.text === 'Cancel') return defaultKeyboard(ctx)
        if (!ctx.callbackQuery) {
            ctx.wizard.back();
            return ctx.wizard.steps[ctx.wizard.cursor](ctx);
        }
        ctx.wizard.state.course = ctx.callbackQuery.data;
        const user = new User();
        await user.signUp(ctx.wizard.state);
        await setKeyboard(ctx);
        await ctx.reply('Thanks for registration');
        return ctx.scene.leave();
    }
)
