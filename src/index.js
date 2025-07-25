require("./loadEnv");
const LocalSession = require('telegraf-session-local');
const EnvService = require('./services/env');

const PORT = EnvService.getServerConfigs().port || 5000;

const BOT = require('./bot');
BOT.use(new LocalSession({database: 'data/data.json'}).middleware());
const stage = require("./scenes");
BOT.use(stage.middleware());

const {
    startCommand,
    helpCommand,
    signUp,
    changeCourse,
    payment,
    getHistory,
    aboutUs,
    chat,
    account,
    contacts,
    coursesPrograms,
    courses,
    price,
    schedule,
    students
} = require('./commands');

const {
    successfulPayment,
    editName,
    editEmail
} = require('./actions/index')

const init = async (bot) => {
    //commands
    bot.start(startCommand);
    bot.help(helpCommand);

    bot.hears('Sign up', signUp);
    bot.hears('Change course', changeCourse);
    bot.hears('Payment', payment);
    bot.hears('History', getHistory);
    bot.hears('About us', aboutUs);
    bot.hears('Contacts', contacts);
    bot.hears('Price', price);
    bot.hears('Courses', courses);
    bot.hears('Course program', coursesPrograms);
    bot.hears('Account', account);
    bot.hears('Lessons', schedule);
    bot.hears('Students', students);
    bot.hears('Chat', chat);

    bot.on('pre_checkout_query', (ctx) => ctx.answerPreCheckoutQuery(true));
    bot.on('successful_payment', successfulPayment);
    bot.action('edit_name', editName);
    bot.action('edit_email', editEmail);

    return bot;
}

init(BOT).then(async bot => {
    const {url, token} = EnvService.getBotConfigs();
    await bot.telegram.setWebhook(`${url}/bot${token}`);
    bot.startWebhook(`/bot${token}`, null, PORT);
    console.log('Started with webhook');
});
