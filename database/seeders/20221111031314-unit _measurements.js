'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('unit_measurements', [
      {
        name: 'GALON',
        status_id: 1
      },
      {
        name: 'METRO CUBICO',
        status_id: 1
      }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('unit_measurements', null, {});
  }
};