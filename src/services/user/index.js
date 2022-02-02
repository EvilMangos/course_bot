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
                     balance = -2800,
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

        if (user && user.isAdmin) return process.env.ADMIN;
        if (user) return process.env.USER;
        return process.env.GUEST;
    }

    async getById(id) {
        return this.models.users.findOne({
            where: {
                telegramId: id
            },
            raw: true,
            nest: true
        })
    }

    async update({
                     firstName,
                     lastName,
                     email,
                     telegramId,
                     course,
                     balance,
                 }) {

        return this.models.users.update({
            firstName,
            lastName,
            email,
            course,
            balance
        }, {
            where: {
                telegramId
            },
            raw: true,
            nest: true
        });
    }

    async createTransaction({
                                userId,
                                amount,
                                payDate
                            }) {
        return this.models.transactions.create({
            userId,
            amount,
            payDate
        });
    }

    async getHistory(id) {
        return this.models.transactions.findAll({
            where: {
                userId: id
            },
            raw: true,
            nest: true
        })
    }

    async getByCourse(course) {
        return this.models.users.findAll({
            where: {
                course
            },
            raw: true,
            nest: true
        })
    }
}

module.exports = User;
