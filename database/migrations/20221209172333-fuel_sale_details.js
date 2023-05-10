'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sale_fuel_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sale_fuel_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'sale_fuels', key: 'id' },
      },
      fuel_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'fuels', key: 'id' },
      },
      count: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'statuses', key: 'id' },
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sale_fuel_details');
  }
};