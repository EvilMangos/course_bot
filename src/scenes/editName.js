const {Scenes} = require('telegraf');
const authValidator = require("../utils/authValidation");
const User = require("../services/user/index");
const setKeyboard = require("../utils/setKeyboard");

module.exports = new Scenes.WizardScene(
    'edit-name',
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
        if (ctx.message && ctx.message.text === 'Cancel') return defaultKeyboard(ctx)
        if (!ctx.wizard.state.lastName && authValidator.name(ctx.message.text)) {
            ctx.wizard.state.lastName = ctx.message.text;
        } else if (!ctx.wizard.state.lastName) {
            ctx.wizard.back();
            return ctx.wizard.steps[ctx.wizard.cursor](ctx);
        }
        const user = new User();
        await user.edit(ctx.wizard.state);
        await setKeyboard(ctx, 'Changed');
        return ctx.scene.leave();
    }
)
