const {COURSES} = require("./constants");

function getCourseDisplayName(courseId) {
    return COURSES.find(course => course.ID === courseId).FORMAT;
}

module.exports = {
    getCourseDisplayName,
}