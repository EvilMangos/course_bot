const {Scenes} = require('telegraf');

const signUp = require('./signUp');
const changeCourse = require('./changeCourse');

module.exports = new Scenes.Stage([signUp, changeCourse]);
