require('./loadEnv');

const {Telegraf} = require('telegraf');

const init = async (BOT_TOKEN) => {
    const bot = new Telegraf(BOT_TOKEN);

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
