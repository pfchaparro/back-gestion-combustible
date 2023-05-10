'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tax_invoices', [
      // ACPM
      {
        fuel_tax_histories_id: 1,
        fuel_id: 1,
        tax_id: 2,
        value: 200
      },
      {
        fuel_tax_histories_id: 1,
        fuel_id: 1,
        tax_id: 11,
        value: 300
      },
      {
        fuel_tax_histories_id: 1,
        fuel_id: 1,
        tax_id: 20,
        value: 400
      },
      // CORRIENTE
      {
        fuel_tax_histories_id: 1,
        fuel_id: 2,
        tax_id: 2,
        value: 500
      }, {
        fuel_tax_histories_id: 1,
        fuel_id: 2,
        tax_id: 11,
        value: 600
      }, {
        fuel_tax_histories_id: 1,
        fuel_id: 2,
        tax_id: 18,
        value: 700
      }, {
        fuel_tax_histories_id: 1,
        fuel_id: 2,
        tax_id: 20,
        value: 800
      },
      // EXTRA
      {
        fuel_tax_histories_id: 1,
        fuel_id: 3,
        tax_id: 2,
        value: 900
      }, {
        fuel_tax_histories_id: 1,
        fuel_id: 3,
        tax_id: 11,
        value: 1000
      }, {
        fuel_tax_histories_id: 1,
        fuel_id: 3,
        tax_id: 18,
        value: 1100
      }, {
        fuel_tax_histories_id: 1,
        fuel_id: 3,
        tax_id: 20,
        value: 1200
      }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tax_invoices', null, {});
  }
};