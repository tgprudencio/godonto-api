module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Alldates', [
      { name: new Date('2023-10-16T00:00:00-03:00') },
      { name: new Date('2023-10-17T00:00:00-03:00') },
      { name: new Date('2023-10-18T00:00:00-03:00') },
      { name: new Date('2023-10-19T00:00:00-03:00') },
      { name: new Date('2023-10-20T00:00:00-03:00') },
      { name: new Date('2023-10-23T00:00:00-03:00') },
      { name: new Date('2023-10-24T00:00:00-03:00') },
      { name: new Date('2023-10-25T00:00:00-03:00') },
      { name: new Date('2023-10-26T00:00:00-03:00') },
      { name: new Date('2023-10-27T00:00:00-03:00') },
      { name: new Date('2023-10-30T00:00:00-03:00') },
      { name: new Date('2023-10-31T00:00:00-03:00') },
      { name: new Date('2023-11-01T00:00:00-03:00') },
      { name: new Date('2023-11-06T00:00:00-03:00') },
      { name: new Date('2023-11-07T00:00:00-03:00') },
      { name: new Date('2023-11-08T00:00:00-03:00') },
      { name: new Date('2023-11-09T00:00:00-03:00') },
      { name: new Date('2023-11-10T00:00:00-03:00') },
      { name: new Date('2023-11-13T00:00:00-03:00') },
      { name: new Date('2023-11-14T00:00:00-03:00') },
      { name: new Date('2023-11-15T00:00:00-03:00') },
      { name: new Date('2023-11-16T00:00:00-03:00') },
      { name: new Date('2023-11-17T00:00:00-03:00') }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Alldates', null, {});
  }
};