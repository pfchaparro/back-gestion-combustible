'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        document: 123456789,
        type_document_id: 1,
        role_id: 1,
        status_id: 1,
        name: 'USER TEST 1',
        last_name: 'PRUEBAS 1',
        email: 'TEST1@GMAIL.COM',
        cellphone: 3147598966,
        password: '$2a$10$V9WK6rtw152Q9UD8H1s52.f2oEqB54i/Ql0zAo9epR9BbBkkDjqI.', // PASSWORD: 'julanito123'
        token: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        document: 1053857167,
        type_document_id: 2,
        role_id: 2,
        status_id: 1,
        name: 'USER TEST 2',
        last_name: 'PRUEBAS 2',
        email: 'TEST2@GMAIL.COM',
        cellphone: 3156987852,
        password: '$2a$10$V9WK6rtw152Q9UD8H1s52.f2oEqB54i/Ql0zAo9epR9BbBkkDjqI.', // PASSWORD: 'julanito123'
        token: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};