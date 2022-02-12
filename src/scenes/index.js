const {Scenes} = require('telegraf');

const signUp = require('./signUp');
const changeCourse = require('./changeCourse');
const editName = require('./editName');
const editEmail = require('./editEmail');

module.exports = new Scenes.Stage([
    signUp,
    changeCourse,
    editName,
    editEmail
]);
