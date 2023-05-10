'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('buy_fuel_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      buy_fuel_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'buy_fuels', key: 'id' },
      },
      fuel_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'fuels', key: 'id' },
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'statuses', key: 'id' },
      },
      count: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      unit_value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
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
    return queryInterface.dropTable('buy_fuel_details');
  }
};