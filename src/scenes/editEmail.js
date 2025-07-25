const {Scenes} = require('telegraf');
const authValidator = require("../utils/authValidation");
const User = require("../services/user/index");
const setKeyboard = require("../utils/setKeyboard");
const {SCENES, ROLES} = require('../constants');
const sceneHelpers = require('./helpers');


const handleCancel = async (ctx) => {
    return sceneHelpers.cancelScene(
        ctx,
        'Changing is canceled',
        ROLES.USER
    );
};

module.exports = new Scenes.WizardScene(
    SCENES.EDIT_EMAIL,
    async (ctx) => {
        await ctx.telegram.sendMessage(ctx.chat.id, 'Change email', sceneHelpers.createCancelKeyboard());
        await ctx.reply('Enter new email:');
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (sceneHelpers.isCancelCommand(ctx)) {
            return handleCancel(ctx);
        }

        sceneHelpers.setTelegramId(ctx);

        const isValid = sceneHelpers.validateAndProceed(
            ctx,
            authValidator.email,
            'email',
            ctx.message.text
        );

        if (!isValid) return;

        const user = new User();
        await user.edit(ctx.wizard.state);

        await setKeyboard(ctx, "Changed");

        return ctx.scene.leave();
    }
)
