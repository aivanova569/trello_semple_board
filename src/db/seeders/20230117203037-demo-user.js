'use strict';

const { hash } = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'user1',
        email: 'user1@gmail.com',
        password: await hash('12345678', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user2',
        email: 'user2@gmail.com',
        password: await hash('12345678', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user3',
        email: 'user3@gmail.com',
        password: await hash('12345678', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
