'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('fuel_tax_history_details', [
      {
        fuel_tax_histories_id: 1,
        fuel_id: 1,
        tax_id: 1,
        value: 5000
      },
      {
        fuel_tax_histories_id: 1,
        fuel_id: 1,
        tax_id: 2,
        value: 1800
      },
      {
        fuel_tax_histories_id: 1,
        fuel_id: 1,
        tax_id: 3,
        value: 2500
      },
      {
        fuel_tax_histories_id: 1,
        fuel_id: 2,
        tax_id: 1,
        value: 1200
      },
      {
        fuel_tax_histories_id: 1,
        fuel_id: 2,
        tax_id: 2,
        value: 800
      }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('fuel_tax_history_details', null, {});
  }
};