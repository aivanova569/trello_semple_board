'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING,
        require: true,
      },
      email: {
        type: Sequelize.STRING,
        require: true,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        require: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        default: new Date()
      },
      updatedAt: {
        type: Sequelize.DATE,
        default: new Date()
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
