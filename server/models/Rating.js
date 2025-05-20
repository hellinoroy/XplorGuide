"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Rating extends Model {
        static associate(models) {
            Rating.belongsTo(models.Tempat, { foreignKey: "tempat_id" });
            Rating.belongsTo(models.User, { foreignKey: "user_id" });
        }
    }
    Rating.init(
        {
            user_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
            },
            tempat_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            rating_rating: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            freezeTableName: true,
            timestamps: false,
        }
    );
    return Rating;
};
