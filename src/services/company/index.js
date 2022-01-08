const baseModel = require('../../db/baseModel');

class Company extends baseModel {
    Company() {}

    async getInfoAboutUs() {
        return `Info about us`;
    }

    async getContacts() {
        return `Contacts`;
    }

    async getPrice() {
        return `Price list`;
    }

}

module.exports = Company;