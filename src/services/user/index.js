const baseModel = require('../../db/baseModel');

class User extends baseModel {
    User() {}

    async getAccountInfo(user) {
        return `Account info`;
    }

    async getPaymentHistory(user) {
        return `Payment history`;
    }

    async signUp({
        firstName,
        lastName,
        course,
        telegramId
    }) {
        const userExist = await this.models.users.findOne({
            where: {
                telegramId
            }
        });

        if(userExist) throw new Error('User already exists');

        return this.models.users.create({
            firstName,
            lastName,
            course,
            telegramId
        });

    }

}

module.exports = User;