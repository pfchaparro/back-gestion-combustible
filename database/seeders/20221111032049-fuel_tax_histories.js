'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('fuel_tax_histories', [
      {
        user_id: 1,
        date: new Date(),
        observation: '',
        status_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('fuel_tax_histories', null, {});
  }
};
