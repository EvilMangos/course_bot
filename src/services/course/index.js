const baseModel = require('../../db/baseModel');

class Course extends baseModel {
    Course() {
    }

    async createLesson({
                           course,
                           startedAt,
                           theme,
                           number
                       }) {
        return this.models.lessons.create({
            course,
            startedAt,
            theme,
            number
        });
    };

    async getLessons(course) {
        return this.models.lessons.findAll({
            where: {
                course
            }
        });
    };

    async getChatLink(course) {
        if (course === process.env.NODE_COURSE)
            return `https://teams.live.com/l/invite/FEA1WfkCZo6imA88AE`;
        else if (course === process.env.DATA_COURSE)
            return `Not available yet`
        else
            return `Mistake with chat link`
    };
}

module.exports = Course;
