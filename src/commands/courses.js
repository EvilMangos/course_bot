const Company = require('../services/company/index');

module.exports = async (ctx) => {
    const companyService = new Company();
    const text = await companyService.getCourses();
    return ctx.reply(text);
}
