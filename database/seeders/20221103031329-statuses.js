'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('statuses', [{
      name: 'ACTIVO'
    },
    {
      name: 'INACTIVO'
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('statuses', null, {});
  }
};