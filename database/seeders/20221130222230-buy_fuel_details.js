'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('buy_fuel_details', [
      {
        buy_fuel_id: 1,
        fuel_id: 1,
        status_id: 1,
        count: 12,
        unit_value: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('buy_fuel_details', null, {});
  }
};