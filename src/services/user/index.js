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
        firstname,
        lastname,
        email,
        course,
        telegramId,
        balance = 0,
        isAdmin = false,
    }) {
        const userExist = await this.models.users.findOne({
            where: {
                telegramId
            }
        });

        if(userExist) throw new Error('User already exists');

        return this.models.users.create({
            firstName: firstname,
            lastName: lastname,
            email,
            course,
            telegramId,
            balance,
            isAdmin
        });

    }

}

module.exports = User;