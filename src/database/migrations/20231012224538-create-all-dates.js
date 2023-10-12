module.exports = {
  up: (QueryInterface, Sequelize) => {
    return QueryInterface.createTable('Alldates', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "Alldates",
    })
  },

  down: QueryInterface => {
   return QueryInterface.dropTable('Alldates');
  }
}