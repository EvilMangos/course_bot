module.exports = {
  up: async (queryInterface, DataTypes) => queryInterface.createTable('users', {
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
      default: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'is_admin',
      default: false
    }
  }),

  down: async (queryInterface, DataTypes) => queryInterface.dropTable("users", {})
};
