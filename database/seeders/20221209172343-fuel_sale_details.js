'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('sale_fuel_details', [
      {
        sale_fuel_id: 1,
        fuel_id: 1,
        count: 500,
        status_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('sale_fuel_details', null, {});
  }
};