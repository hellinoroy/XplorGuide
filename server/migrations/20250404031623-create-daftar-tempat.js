'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('daftar_tempat', {
      tempat_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tempat_nama: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      tempat_deskripsi: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      tempat_kategori: {
        type: Sequelize.STRING,
        allowNull: false

      },
      tempat_kota: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tempat_rating: {
        type: Sequelize.DECIMAL(2, 1),
      },
      tempat_harga: {
        type: Sequelize.INTEGER
      },
      tempat_lat: {
        type: Sequelize.FLOAT
      },
      tempat_long: {
        type: Sequelize.FLOAT
      },
      tempat_updateTerakhir: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      tempat_foto: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tempat_bookmark: {
        type: Sequelize.INTEGER
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('daftar_tempat');
  }
};