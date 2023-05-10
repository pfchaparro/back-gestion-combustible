'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('buy_fuels', [
      {
        user_id: 1,
        status_id: 1,
        date: new Date(),
        bill_number: '12345',
        iva: 10,
        tax: 5,
        dynamax: 20,
        other_concepts: 4,
        sub_total: 250,
        total: 350,
        observation: '',
        attached: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('buy_fuels', null, {});
  }
};