module.exports = {
    up: async (queryInterface, DataTypes) => queryInterface.createTable('lessons', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            field: 'id',
            primaryKey: true,
            autoIncrement: true
        },
        course: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'course'
        },
        startedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'started_at'
        },
        theme: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'theme'
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'number'
        }
    }),

    down: async (queryInterface, DataTypes) => queryInterface.dropTable("lessons", {})
};
