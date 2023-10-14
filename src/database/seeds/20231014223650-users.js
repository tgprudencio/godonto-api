module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      { name: 'Usuário Teste 1', email: 'usuario1@teste.com', passwordHash: '$2a$08$R4KOAZLea727Ig.uGMiL4ubMWyzF.6XnSagDXsEsdyBE3hzlXgYha', provider: false, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Usuário Teste 2', email: 'usuario2@teste.com', passwordHash: '$2a$08$R4KOAZLea727Ig.uGMiL4ubMWyzF.6XnSagDXsEsdyBE3hzlXgYha', provider: false, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Usuário Teste 3', email: 'usuario3@teste.com', passwordHash: '$2a$08$R4KOAZLea727Ig.uGMiL4ubMWyzF.6XnSagDXsEsdyBE3hzlXgYha', provider: false, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};