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
        if (!ctx.wizard.state.firstName && authValidator.name(ctx.message.text)) {
            ctx.wizard.state.firstName = ctx.message.text;
        } else if (!ctx.wizard.state.firstName) {
            ctx.wizard.back();
            return ctx.wizard.steps[ctx.wizard.cursor](ctx);
        }
        await ctx.reply('Enter your last name:');
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (ctx.message.text === 'Cancel') return defaultKeyboard(ctx)
        if (!ctx.wizard.state.lastName && authValidator.name(ctx.message.text)) {
            ctx.wizard.state.lastName = ctx.message.text;
        } else if (!ctx.wizard.state.lastName) {
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
                Markup.button.callback(process.env.NODE_COURSE_FORMAT, process.env.NODE_COURSE),
                Markup.button.callback(process.env.DATA_COURSE_FORMAT, process.env.DATA_COURSE)
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
        await setKeyboard(ctx, `Hello ${ctx.wizard.state.lastName} ${ctx.wizard.state.firstName}`);
        await ctx.reply('Thanks for registration');
        return ctx.scene.leave();
    }
)
