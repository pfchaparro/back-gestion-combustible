'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('fuel_price_histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fuel_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'fuels', key: 'id' },
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      sale_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      purchase_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      observation: {
        type: Sequelize.STRING(255),
        allowNull: false
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
    return queryInterface.dropTable('fuel_price_histories');
  }
};