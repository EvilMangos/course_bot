const transactionsModel = (sequelize, DataTypes) => {
    return sequelize.define(
        'transactions',
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                field: 'id',
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                field: 'user_id',
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            amount: {
                type: DataTypes.FLOAT,
                allowNull: false,
                field: 'amount',
                default: false
            },
            payDate: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'payDate'
            }
        },
        {
            tableName: 'transactions',
            timestamps: false
        }
    )
};

module.exports = transactionsModel;