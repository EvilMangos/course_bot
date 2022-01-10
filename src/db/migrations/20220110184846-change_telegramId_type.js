module.exports = {
  up: async (queryInterface, DataTypes) => queryInterface.changeColumn(
      'users',
      'telegram_id',
      {
        type: DataTypes.INTEGER,
      }
  ),

  down: async (queryInterface, DataTypes) => queryInterface.changeColumn(
      'users',
      'telegram_id',
      {
        type: DataTypes.STRING,
      }
  )
};
