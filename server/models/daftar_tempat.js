'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class daftar_tempat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  daftar_tempat.init({
    tempat_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    tempat_nama: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Nama tempat sudah ada"
      },
      unique: true,
    },
    tempat_deskripsi: {
      type: DataTypes.TEXT,
      allowNull: false

    },
    tempat_kategori: {
      type: DataTypes.STRING,
      allowNull: false

    },
    tempat_kota: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tempat_rating: {
      type: DataTypes.DECIMAL(2, 1),
    },
    tempat_harga: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tempat_lat: {
      type: DataTypes.FLOAT
    },
    tempat_long: {
      type: DataTypes.FLOAT
    },
    tempat_updateTerakhir: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    tempat_foto: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tempat_bookmark: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'daftar_tempat',
    timestamps: false,
    freezeTableName: true
  });
  return daftar_tempat;
};