'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('fuels', [
      {
        name: 'CORRIENTE',
        status_id: 1,
        unit_measurement_id: 1,
        evaporation_percentage: 9.5,
        sale_price: 7000,
        purchase_price: 6600,
        order: 1
      },{
        name: 'ACPM',
        status_id: 1,
        unit_measurement_id: 1,
        evaporation_percentage: 8,
        sale_price: 7000,
        purchase_price: 6200,
        order: 2
      },{
        name: 'EXTRA',
        status_id: 1,
        unit_measurement_id: 1,
        evaporation_percentage: 2.5,
        sale_price: 7000,
        purchase_price: 6400,
        order: 3
      }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('fuels', null, {});
  }
};