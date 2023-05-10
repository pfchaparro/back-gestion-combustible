'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('fuel_tax_history_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fuel_tax_histories_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'fuel_tax_histories', key: 'id' },
      },
      fuel_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'fuels', key: 'id' },
      },
      tax_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'taxes', key: 'id' },
      },
      value: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: true,
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('fuel_tax_history_details');
  }
};