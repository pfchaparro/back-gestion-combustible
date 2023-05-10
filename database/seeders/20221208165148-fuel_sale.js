'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('sale_fuels', [
      {
        date: new Date(),
        user_id: 1,
        status_id: 1,
        observation: 'Actualizando',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('sale_fuels', null, {});
  }
};