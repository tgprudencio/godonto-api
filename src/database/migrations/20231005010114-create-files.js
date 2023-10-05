module.exports = {
  up: (QueryInterface, Sequelize) => {
    return QueryInterface.createTable('Files', {
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
      path: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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
      tableName: "Files",
    })
  },

  down: QueryInterface => {
   return QueryInterface.dropTable('Files');
  }
}