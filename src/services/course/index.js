const baseModel = require('../../db/baseModel');

class Course extends baseModel {
    Course() {}

    async getCourseProgram(course) {
        return `Course program`;
    }

    async getCoursesList() {
        return `Courses list`;
    }

    async getLinkToChat(user) {
        return `Link to chat`;
    }

    async changeCourse(user, course) {
        return `Course is changed`;
    }

    async getLessonsSchedule(user) {
        return `Lessons schedule`;
    }
}

module.exports = Course;