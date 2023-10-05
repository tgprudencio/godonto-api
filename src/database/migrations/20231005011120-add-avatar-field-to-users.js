'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Users',
      'avatarId',
      {
        type: Sequelize.INTEGER,
        references: { model: 'Files', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      }
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Users', 'avatarId');
  }
};
