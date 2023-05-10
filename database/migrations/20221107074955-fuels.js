'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('fuels', {
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
      unit_measurement_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'unit_measurements', key: 'id' },
      },
      evaporation_percentage: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      sale_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      purchase_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('fuels');
  }
};