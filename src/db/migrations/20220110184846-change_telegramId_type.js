module.exports = {
  up: async (queryInterface, DataTypes) => queryInterface.changeColumn(
      'users',
      'telegram_id',
      'INTEGER USING CAST(telegram_id AS INTEGER)'
  ),

  down: async (queryInterface, DataTypes) => queryInterface.changeColumn(
      'users',
      'telegram_id',
      {
        type: DataTypes.STRING,
      }
  )
};
