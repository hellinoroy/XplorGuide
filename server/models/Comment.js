"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Comment.belongsTo(models.Tempat, { foreignKey: "tempat_id" });
            Comment.belongsTo(models.User, { foreignKey: "user_id" });
        }
    }
    Comment.init(
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
            comment_comment: { 
                type: DataTypes.TEXT, 
                allowNull: false },
        },
        {
            sequelize,
            freezeTableName: true,
            timestamps: false,
        }
    );
    return Comment;
};
