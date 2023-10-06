module.exports = {
  up: (QueryInterface, Sequelize) => {
    return QueryInterface.createTable('Specializations', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    },
    {
      tableName: "Specializations",
    })
  },

  down: QueryInterface => {
   return QueryInterface.dropTable('Specializations');
  }
}