require('./loadEnv');

const LocalSession = require('telegraf-session-local');

const BOT = require('./bot');
BOT.use(new LocalSession({database: 'data/data.json'}).middleware());
const stage = require("./scenes");
BOT.use(stage.middleware());

const {
    startCommand,
    helpCommand,
    signUp,
    changeCourse,
    payment
} = require('./commands');

const {
    successfulPayment
} = require('./actions/index')

const init = async (bot) => {
    //commands
    bot.start(startCommand);
    bot.help(helpCommand);

    bot.hears('Sign Up', signUp);
    bot.hears('Change course', changeCourse);
    bot.hears('Payment', payment);

    bot.on('pre_checkout_query', (ctx) => ctx.answerPreCheckoutQuery(true));
    bot.on('successful_payment', successfulPayment);

    return bot;
}

init(BOT).then(bot => {
    bot.launch()
        .then(() => {
            console.log('Bot started');
        })
        .catch(err => {
            console.log(err);
        });
});
