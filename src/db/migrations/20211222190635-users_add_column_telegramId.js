module.exports = {
  up: async (queryInterface, DataTypes) => queryInterface.addColumn(
      'users',
      'telegram_id',
      {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'telegram_id'
      }),

  down: async (queryInterface, DataTypes) => queryInterface.removeColumn(
      'users',
      'telegram_id'
      )
};
