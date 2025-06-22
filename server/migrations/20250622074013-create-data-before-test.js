'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Data_before_tests', {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      place_id: {
        type: Sequelize.INTEGER
      },
      place_rating: {
        type: Sequelize.INTEGER
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Data_before_tests');
  }
};