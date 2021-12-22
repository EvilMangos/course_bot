const baseModel = require('../../db/baseModel');

class User extends baseModel {
    User() {}

    async getAccountInfo(user) {
        return `Account info`;
    }

    async getPaymentHistory(user) {
        return `Payment history`;
    }

}

module.exports = User;