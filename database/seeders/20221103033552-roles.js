'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('roles', [
    {
      name: 'ADMINISTRADOR',
      status_id: 1
    },
    {
      name: 'FUNCIONARIO',
      status_id: 1
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  }
};