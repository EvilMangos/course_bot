require('./loadEnv');

const {Telegraf} = require('telegraf');

const {
    startCommand,
    helpCommand
} = require('./commands');

const init = async (BOT_TOKEN) => {
    const bot = new Telegraf(BOT_TOKEN);

    //commands
    bot.start(startCommand);
    bot.help(helpCommand);

    return bot;
}

init(process.env.BOT_TOKEN).then(bot => {
    bot.launch()
        .then(() => {
            console.log('Bot started');
        })
        .catch(err => {
            console.log(err);
        });
});
