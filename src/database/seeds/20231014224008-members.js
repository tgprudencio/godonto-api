module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Members', [
      { name: 'Dentista 1', email: 'dentista1@clinica.com', professionStartAt: new Date('2013-10-06T00:17:00-03:00'), specializationId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Dentista 2', email: 'dentista2@clinica.com', professionStartAt: new Date('2013-01-01T00:18:00-03:00'), specializationId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Dentista 3', email: 'dentista3@clinica.com', professionStartAt: new Date('2017-01-01T00:18:00-03:00'), specializationId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Dentista 4', email: 'dentista4@clinica.com', professionStartAt: new Date('2023-01-01T00:17:00-03:00'), specializationId: 2, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Members', null, {});
  }
};