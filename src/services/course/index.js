const baseModel = require('../../db/baseModel');

class Course extends baseModel {
    Course() {}

    static async getCourseProgram(course) {
        return `Course program`;
    }

    static async getCoursesList() {
        return `Courses list`;
    }

    static async getLinkToChat(user) {
        return `Link to chat`;
    }

    static async changeCourse(user, course) {
        return `Course is changed`;
    }

    static async getLessonsSchedule(user) {
        return `Lessons schedule`;
    }
}

module.exports = Course;