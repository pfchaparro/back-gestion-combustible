'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('buy_fuels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'statuses', key: 'id' },
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      bill_number: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      iva: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      tax: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      dynamax: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      other_concepts: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      sub_total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      observation: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      attached: {
        type: Sequelize.STRING(255),
        allowNull: true
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
    return queryInterface.dropTable('buy_fuels');
  }
};