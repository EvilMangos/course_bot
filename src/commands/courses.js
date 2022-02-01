const Company = require('../services/company/index');

module.exports = async (ctx) => {
    const companyService = new Company();
    const text = companyService.getCourses();
    return ctx.reply(text);
}
