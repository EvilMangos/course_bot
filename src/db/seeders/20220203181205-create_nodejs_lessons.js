require("../../loadEnv");
const Course = require('../../services/course/index');
const BaseModel = require('../baseModel');

const themesList = [
    'Introduction.',
    'JavaScript basics.',
    'Functions. Methods.',
    'JavaScript advanced.',
    'Async. Errors catching.',
    'Node.js technic side. NPM.',
    'Node.js basics.',
    'Express.',
    'Git.',
    'MongoDB.',
    'Project1 - start structure.',
    'Project1 - cookie.',
    'Project1 - session.',
    'Project1 - jwt.',
    'SQL.',
    'Sequelize basics.',
    'Sequelize advanced.',
    'Testing basics.',
    'Testing practice.',
    'Project2.',
    'Project2.',
    'Project2.',
    'Project2.',
    'Project2.',
    'Work preparation.',
    'Interview preparation.',
    'Summary.'
];

module.exports = {
    up: async () => {
        const course = new Course();
        let date = new Date('2022-03-03T21:00:00');
        for (let i = 0; i < 27; i++) {
            await course.createLesson({
                course: 'nodejs',
                number: i + 1,
                theme: themesList[i],
                startedAt: date
            });
            date.setDate(date.getDate() + (date.getDay() === 1 ? 3 : 4));
        }
    },

    down: async () => {
        const baseModel = new BaseModel();
        await baseModel.models.lessons.destroy({
            where: {
                course: 'nodejs'
            }
        });
    }
};
