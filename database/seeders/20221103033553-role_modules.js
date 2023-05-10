'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('role_modules', [{
      role_id: 1,
      module_id: 1,
      permissions: '1,2,3,4'
    },
    {
      role_id: 1,
      module_id: 2,
      permissions: '1,2,3,4'
    },
    {
      role_id: 1,
      module_id: 3,
      permissions: '1,2,3,4'
    },
    {
      role_id: 1,
      module_id: 4,
      permissions: '1,2,3,4'
    },
    {
      role_id: 1,
      module_id: 5,
      permissions: '1,2,3,4'
    },
    {
      role_id: 2,
      module_id: 2,
      permissions: '1,2,3,4'
    },
    {
      role_id: 2,
      module_id: 3,
      permissions: '1,2,3,4'
    },
    {
      role_id: 2,
      module_id: 4,
      permissions: '1,2,3,4'
    },
    {
      role_id: 2,
      module_id: 5,
      permissions: '1,2,3,4'
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('role_modules', null, {});
  }
};