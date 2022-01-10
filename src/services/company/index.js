const baseModel = require('../../db/baseModel');

class Company extends baseModel {
    Company() {}

    static async getInfoAboutUs() {
        return `Info about us`;
    }

    static async getContacts() {
        return `Contacts`;
    }

    static async getPrice() {
        return `Price list`;
    }

}

module.exports = Company;