'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      document: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      type_document_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'type_documents', key: 'id' }
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'roles', key: 'id' }
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'statuses', key: 'id' }
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      cellphone: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      token: {
        type: Sequelize.STRING(255),
        defaultValue: null
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
    return queryInterface.dropTable('users');
  }
};