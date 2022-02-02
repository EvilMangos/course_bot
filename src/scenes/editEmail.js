const {Scenes} = require('telegraf');
const authValidator = require("../utils/authValidation");
const User = require("../services/user/index");
const setKeyboard = require("../utils/setKeyboard");
const keyboardData = require("../utils/keyboardData.json");

const defaultKeyboard = async (ctx) => {
    await ctx.telegram.sendMessage(ctx.chat.id, 'Changing is canceled', {
        reply_markup: {
            resize_keyboard: true,
            keyboard: keyboardData.user
        }
    });
    return ctx.scene.leave();
}

module.exports = new Scenes.WizardScene(
    'edit-email',
    async (ctx) => {
        await ctx.telegram.sendMessage(ctx.chat.id, 'Change email', {
            reply_markup: {
                resize_keyboard: true,
                keyboard: [
                    [
                        {text: 'Cancel'}
                    ]
                ]
            }
        });
        await ctx.reply('Enter new email:');
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (ctx.message && ctx.message.text === 'Cancel') return defaultKeyboard(ctx)
        if (!ctx.wizard.state.email && authValidator.name(ctx.message.text)) {
            ctx.wizard.state.telegramId = ctx.chat.id;
            ctx.wizard.state.email = ctx.message.text;
        } else if (!ctx.wizard.state.email) {
            ctx.wizard.back();
            return ctx.wizard.steps[ctx.wizard.cursor](ctx);
        }
        const user = new User();
        await user.edit(ctx.wizard.state);
        await setKeyboard(ctx, 'Changed');
        return ctx.scene.leave();
    }
)
