const usersModel = (sequelize, DataTypes) => {
    return sequelize.define(
        'users',
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                field: 'id',
                primaryKey: true,
                autoIncrement: true
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'first_name'
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'last_name'
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'email'
            },
            telegramId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                field: 'telegram_id'
            },
            course: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'course',
                default: 0
            },
            balance: {
                type: DataTypes.FLOAT,
                allowNull: false,
                field: 'balance',
                default: 0
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                field: 'is_admin',
                default: false
            }
        },
        {
            tableName: 'users',
            timestamps: false
        }
    )
};

module.exports = usersModel;
