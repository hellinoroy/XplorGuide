"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Bookmark extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Bookmark.belongsTo(models.Tempat, { foreignKey: "tempat_id" });
            Bookmark.belongsTo(models.User, { foreignKey: "user_id" });
        }
    }
    Bookmark.init(
        {
            user_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            tempat_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
        },
        {
            sequelize,
            freezeTableName: true,
            timestamps: false,
        }
    );
    return Bookmark;
};
