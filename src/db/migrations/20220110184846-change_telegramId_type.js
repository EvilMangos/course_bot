module.exports = {
  up: async (queryInterface, DataTypes) => queryInterface.changeColumn(
      'users',
      'telegram_id',
      'BIGINT USING CAST(telegram_id AS BIGINT)'
  ),

  down: async (queryInterface, DataTypes) => queryInterface.changeColumn(
      'users',
      'telegram_id',
      {
        type: DataTypes.STRING,
      }
  )
};
