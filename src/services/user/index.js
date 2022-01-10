const baseModel = require('../../db/baseModel');

class User extends baseModel {
    User() {}

    static async getAccountInfo(user) {
        return `Account info`;
    }

    static async getPaymentHistory(user) {
        return `Payment history`;
    }

    static async signUp({
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

    static async auth(telegramId) {
        const user = this.models.users.findOne({
            where: {
                telegramId
            }
        });

        return !!user;
    }
}

module.exports = User;