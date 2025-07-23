const baseModel = require('../../db/baseModel');

class User extends baseModel {
    User() {
    }

    async getAccountInfo() {
        return `Account info`;
    }

    async getPaymentHistory() {
        return `Payment history`;
    }

    async signUp({
                     firstName,
                     lastName,
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
                firstName,
                lastName,
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

        if (user && user.isAdmin) return process.env.ADMIN_ROLE;
        if (user) return process.env.USER_ROLE;
        return process.env.GUEST_ROLE;
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
                course,
                isAdmin: false
            },
            raw: true,
            nest: true
        })
    }

    async getAccount(user) {
        return `
<b>Name:</b> ${user.lastName} ${user.firstName}
<b>Email:</b> ${user.email}
<b>Course:</b> ${user.course === process.env.NODE_COURSE ? process.env.NODE_COURSE_FORMAT : process.env.DATA_COURSE_FORMAT}
<b>Balance:</b> ${user.balance} UAH
        `
    }

    async edit(userData) {
        const user = await this.models.users.findOne({
            where: {telegramId: userData.telegramId},
            raw: true,
            nest: true
        });

        if (!user) throw new Error("User doesn't exist");
        delete userData.telegramId;
        return this.models.users.update(userData, {
            where: {telegramId: user.telegramId}
        });
    }
}

module.exports = User;
