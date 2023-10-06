module.exports = {
  up: (QueryInterface, Sequelize) => {
    return QueryInterface.createTable('Members', {
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
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      professionStartAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      specializationId: {
        type: Sequelize.INTEGER,
        references: { model: 'Specializations', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
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
      tableName: "Members",
    })
  },

  down: QueryInterface => {
   return QueryInterface.dropTable('Members');
  }
}