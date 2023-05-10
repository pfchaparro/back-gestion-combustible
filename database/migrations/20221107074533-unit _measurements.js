'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('unit_measurements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'statuses', key: 'id' },
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('taxunit_measurements');
  }
};