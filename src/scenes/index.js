const {Scenes} = require('telegraf');

const signUp = require('./signUp')

module.exports = new Scenes.Stage([signUp]);
