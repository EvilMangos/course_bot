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
    successfulPayment
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
