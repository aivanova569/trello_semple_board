'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cards', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: Sequelize.TEXT,
        required: true
      },
      order: {
        type: Sequelize.INTEGER,
        required: true
      },
      columnId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'columns',
          key: 'id'
        }
      },
      boardId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'boards',
          key: 'id'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        default: new Date()
      },
      updatedAt: {
        type: Sequelize.DATE,
        default: new Date()
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('cards');
  }
};
