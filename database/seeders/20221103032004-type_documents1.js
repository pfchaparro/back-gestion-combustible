'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('type_documents', [{
      name: 'CEDULA'
    },
    {
      name: 'PASAPORTE'
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('type_documents', null, {});
  }
};