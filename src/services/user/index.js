const baseModel = require('../../db/baseModel');

class User extends baseModel {
    User() {
    }

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

        if (userExist) throw new Error('User already exists');

        let user;
        try {
            user = await this.models.users.create({
                firstName: firstname,
                lastName: lastname,
                email,
                course,
                telegramId,
                balance,
                isAdmin
            });
        } catch (err) {
            throw new Error(err);
        }

        return user.get({plain: true});
    }

    async auth(telegramId) {
        const user = await this.models.users.findOne({
            where: {
                telegramId
            },
            raw: true,
            nest: true
        });

        if (user && user.isAdmin) return 'admin';
        if (user) return 'user';
        return 'guest';
    }
}

module.exports = User;
