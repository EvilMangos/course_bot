const { Markup } = require('telegraf');
const keyboardData = require('../../utils/keyboardData.json');
const {COURSES} = require('../../constants');

async function cancelScene(ctx, message, keyboardType) {
    await ctx.telegram.sendMessage(ctx.chat.id, message, {
        reply_markup: {
            resize_keyboard: true,
            keyboard: keyboardData[keyboardType]
        }
    });
    return ctx.scene.leave();
}

function createCancelKeyboard() {
    return {
        reply_markup: {
            resize_keyboard: true,
            keyboard: [
                [
                    { text: "Cancel" }
                ]
            ]
        }
    };
}

function isCancelCommand(ctx) {
    return ctx.message && ctx.message.text === "Cancel";
}

function validateAndProceed(ctx, validationFn, stateKey, value) {
    if (!ctx.wizard.state[stateKey] && validationFn(value)) {
        ctx.wizard.state[stateKey] = value;
        return true;
    } else if (!ctx.wizard.state[stateKey]) {
        ctx.wizard.back();
        ctx.wizard.steps[ctx.wizard.cursor](ctx);
        return false;
    }
    return true;
}

function createCourseKeyboard() {
    return Markup.inlineKeyboard(
        COURSES.map(course =>
            Markup.button.callback(course.FORMAT, course.ID)
        )
    ).oneTime();
}

function setTelegramId(ctx) {
    ctx.wizard.state.telegramId = ctx.message ? ctx.message.chat.id : ctx.chat.id;
}

module.exports = {
    cancelScene,
    createCancelKeyboard,
    isCancelCommand,
    validateAndProceed,
    createCourseKeyboard,
    setTelegramId
};
