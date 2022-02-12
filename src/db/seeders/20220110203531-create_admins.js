const BaseModel = require('../baseModel');

const admins = {
    Max: {
        firstName: "Maksym",
        lastName: "Khamets",
        email: "jchamets@gmail.com",
        course: "nodejs",
        telegramId: 370478309,
    },
    Alex: {
        firstName: "Alex",
        lastName: "Kharchenko",
        email: "alexeyspace3@gmail.com",
        course: "dataengineering",
        telegramId: 440762096,
    }
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
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

    down: async (queryInterface, Sequelize) => {
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
