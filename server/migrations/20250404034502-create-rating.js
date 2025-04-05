'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ratings', {
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
      rating: {
        type: Sequelize.INTEGER,
        max: 10
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ratings');
  }
};