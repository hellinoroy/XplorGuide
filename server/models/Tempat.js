"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Tempat extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Tempat.hasMany(models.Bookmark, { foreignKey: "tempat_id" });
            Tempat.hasMany(models.Rating, { foreignKey: "tempat_id" });
            Tempat.hasMany(models.Comment, { foreignKey: "tempat_id" });
        }
    }
    Tempat.init(
        {
            tempat_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            tempat_nama: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    msg: "Nama tempat sudah ada",
                },
                unique: true,
            },
            tempat_deskripsi: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            tempat_kategori: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            tempat_kota: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            tempat_foto: {
                type: DataTypes.STRING,
            },
            tempat_rating: {
                type: DataTypes.DECIMAL(2, 1),
            },
        },
        {
            sequelize,
            freezeTableName: true,
            timestamps: false,
        }
    );
    return Tempat;
};
