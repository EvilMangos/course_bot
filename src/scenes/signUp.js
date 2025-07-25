const {Scenes} = require('telegraf');
const authValidator = require('../utils/authValidation');
const User = require('../services/user/index');
const setKeyboard = require('../utils/setKeyboard');
const {SCENES, ROLES} = require('../constants');
const sceneHelpers = require("./helpers");

const handleCancel = async (ctx) => {
    return sceneHelpers.cancelScene(
        ctx,
        'Sign up is canceled',
        ROLES.GUEST
    );
};

module.exports = new Scenes.WizardScene(
    SCENES.SIGNUP,

    async (ctx) => {
        await ctx.telegram.sendMessage(
            ctx.chat.id,
            'SignUp',
            sceneHelpers.createCancelKeyboard()
        );
        await ctx.reply('Enter your first name:');
        return ctx.wizard.next();
    },

    async (ctx) => {
        if (sceneHelpers.isCancelCommand(ctx)) {
            return handleCancel(ctx);
        }

        sceneHelpers.setTelegramId(ctx);

        const isValid = sceneHelpers.validateAndProceed(
            ctx,
            authValidator.name,
            'firstName',
            ctx.message.text
        );

        if (!isValid) return;

        await ctx.reply('Enter your last name:');
        return ctx.wizard.next();
    },

    async (ctx) => {
        if (sceneHelpers.isCancelCommand(ctx)) {
            return handleCancel(ctx);
        }

        const isValid = sceneHelpers.validateAndProceed(
            ctx,
            authValidator.name,
            'lastName',
            ctx.message.text
        );

        if (!isValid) return;

        await ctx.reply('Enter you Microsoft Teams e-mail address:');
        return ctx.wizard.next();
    },

    async (ctx) => {
        if (sceneHelpers.isCancelCommand(ctx)) {
            return handleCancel(ctx);
        }

        const isValid = sceneHelpers.validateAndProceed(
            ctx,
            authValidator.email,
            'email',
            ctx.message.text
        );

        if (!isValid) return;

        await ctx.reply(
            'Choose a course',
            sceneHelpers.createCourseKeyboard()
        );

        return ctx.wizard.next();
    },

    async (ctx) => {
        if (sceneHelpers.isCancelCommand(ctx)) {
            return handleCancel(ctx);
        }

        if (!ctx.callbackQuery) {
            ctx.wizard.back();
            return ctx.wizard.steps[ctx.wizard.cursor](ctx);
        }

        ctx.wizard.state.course = ctx.callbackQuery.data;

        const user = new User();
        await user.signUp(ctx.wizard.state);

        const greeting = `Hello ${ctx.wizard.state.lastName} ${ctx.wizard.state.firstName}`;
        await setKeyboard(ctx, greeting);
        await ctx.reply('Thanks for registration');

        return ctx.scene.leave();
    }
);