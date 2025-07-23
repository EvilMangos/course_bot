require("../../loadEnv");
const BaseModel = require('../baseModel');

const admins = {
    Max: {
        firstName: "12345",
        lastName: "12345",
        email: "12345@gmail.com",
        course: "nodejs",
        telegramId: 12345,
    },
    Alex: {
        firstName: "123456",
        lastName: "123456",
        email: "123456@gmail.com",
        course: "dataengineering",
        telegramId: 123456,
    }
}

module.exports = {
    up: async (queryInterface) => {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            const baseModel = new BaseModel();
            await baseModel.models.users.create({
                ...admins.Max,
                balance: 0,
                isAdmin: true
            }, {
                transaction
            });
            await baseModel.models.users.create({
                ...admins.Alex,
                balance: 0,
                isAdmin: true
            }, {
                transaction
            });
            transaction.commit();
        } catch (e) {
            transaction.rollback();
            throw e;
        }
    },

    down: async (queryInterface) => {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            const baseModel = new BaseModel();
            await baseModel.models.users.destroy({
                where: {
                    isAdmin: true,
                    course: [process.env.NODE, process.env.DATA]
                },
                transaction
            });
            transaction.commit();
        } catch (e) {
            transaction.rollback();
            throw e;
        }
    }
};
