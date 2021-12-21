const sessionsModel = (sequelize, DataTypes) => {
    return sequelize.define(
        'sessions',
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
            sessionKey: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'session_key',
                default: false
            }
        },
        {
            tableName: 'sessions',
            timestamps: false
        }
    )
};

module.exports = sessionsModel;