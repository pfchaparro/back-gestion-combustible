'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('fuel_price_histories', [
      {
        fuel_id: 1,
        user_id: 1,
        sale_price: 5000,
        purchase_price: 4500,
        observation: 'TEXT 1',
        status_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fuel_id: 2,
        user_id: 1,
        sale_price: 6000,
        purchase_price: 5200,
        observation: 'TEXT 2',
        status_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fuel_id: 3,
        user_id: 1,
        sale_price: 7000,
        purchase_price: 6300,
        observation: 'TEXT 3',
        status_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('fuel_price_histories', null, {});
  }
};