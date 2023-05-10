'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('modules', [{
      name: 'USUARIOS',
      icon: 'fas fa-users',
      status_id: 1
    },
    {
      name: 'IMPUESTOS COMBUSTIBLE',
      icon: 'fas fa-users',
      status_id: 1
    },
    {
      name: 'COMPRA COMBUSTIBLE',
      icon: 'fas fa-users',
      status_id: 1
    },
    {
      name: 'VENTAS COMBUSTIBLE',
      icon: 'fas fa-users',
      status_id: 1
    },
    {
      name: 'REPORTES',
      icon: 'fas fa-users',
      status_id: 1
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('modules', null, {});
  }
};