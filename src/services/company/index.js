const baseModel = require('../../db/baseModel');

class Company extends baseModel {
    Company() {
    }

    async getInfoAboutUs() {
        const text =
            `
123456789
    `;
        return text;
    }

    async getContacts() {
        return `123456789`;
    }

    async getPrice() {
        return `
100$ per month (3 months)
300$ full course
    `;
    }

    async getCourses() {
        const coursesInfo = `
123456789
`
        return coursesInfo;
    }
}

module.exports = Company;
