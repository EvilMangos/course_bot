module.exports = {
  up: async (queryInterface, DataTypes) => queryInterface.createTable('transactions', {
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
  }),

  down: async (queryInterface, DataTypes) => queryInterface.dropTable("transactions", {})
};
