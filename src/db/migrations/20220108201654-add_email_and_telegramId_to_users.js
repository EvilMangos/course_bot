module.exports = {
    up: async (queryInterface, DataTypes) => queryInterface.sequelize.transaction().then(t =>
        Promise.all([
            queryInterface.addColumn('users', 'email', {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'email'
            }, {
                transaction: t
            }),
            queryInterface.addColumn('users', 'telegram_id', {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'telegram_id'
            }, {
                transaction: t
            })
        ])
            .catch(err => {
                console.log(err);
                t.rollback();
            })
            .then(async () => await t.commit())
    ),
    down: async (queryInterface, DataTypes) => queryInterface.sequelize.transaction().then(t =>
        Promise.all([
            queryInterface.removeColumn('users', 'email', {
                transaction: t
            }),
            queryInterface.removeColumn('users', 'telegram_id', {
                transaction: t
            })
        ])
            .catch(err => {
                console.log(err);
                t.rollback();
            })
            .then(async () => await t.commit())
    )
};
