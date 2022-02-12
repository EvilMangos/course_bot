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
}

module.exports = Course;
