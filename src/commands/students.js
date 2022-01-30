const User = require('../services/user/index');

const formatStudentsList = (students) => {
    const payedCount = students.filter(student => student.balance >= 0).length;
    let result = `Students list\nStudents count: ${students.length}\nPayed count: ${payedCount}\n`;
    students.forEach((student) => {
        result += `<b>balance:</b> ${student.balance}\t<b>name:</b> ${student.firstName} ${student.lastName}\n`;
    });
    return result;
}

module.exports = async (ctx) => {
    const userService = new User();
    const admin = await userService.getById(ctx.chat.id);
    const studentsList = await userService.getByCourse(admin.course);
    const result = formatStudentsList(studentsList);
    return ctx.replyWithHTML(result);
}

