module.exports = {
    up: async (queryInterface, Sequelize) => queryInterface.addConstraint('users', {
        fields: ['telegram_id'],
        type: "unique",
        name: 'users_telegram_id_unique_constraint'
    }),

    down: async (queryInterface, Sequelize) => queryInterface.removeConstraint(
        'users',
        'users_telegram_id_unique_constraint'
    )
};
