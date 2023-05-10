'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('taxes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'statuses', key: 'id' },
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('taxes');
  }
};
