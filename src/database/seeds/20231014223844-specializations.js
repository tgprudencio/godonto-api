module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Specializations', [
      { name: 'Odontopediatra', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Ortodontia', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Traumatologia', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Endodontia', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Specializations', null, {});
  }
};