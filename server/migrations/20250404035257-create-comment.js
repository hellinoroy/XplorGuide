'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        references: {
          model: {
            tableName: 'User'
          },
          key: 'id'
        }
      },
      tempat_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'daftar_tempat'
          },
          key: 'tempat_id'
        }
      },
      comment: {
        type: Sequelize.TEXT
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('comments');
  }
};