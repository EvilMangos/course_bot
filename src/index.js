require('./loadEnv');

const LocalSession = require('telegraf-session-local');

const BOT = require('./bot');
BOT.use(new LocalSession({database: 'data/data.json'}).middleware());
const stage = require("./scenes");
BOT.use(stage.middleware());

const {
    startCommand,
    helpCommand,
    signUp
} = require('./commands');


const init = async (bot) => {
    //commands
    bot.start(startCommand);
    bot.help(helpCommand);
    bot.command('signUp',  signUp);

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
