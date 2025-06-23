"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Data_before_tests extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Data_before_tests.init(
        {
            user_id: DataTypes.INTEGER,
            place_id: DataTypes.INTEGER,
            place_rating: DataTypes.INTEGER,
            implicit_label: DataTypes.INTEGER,
        },
        {  
            
            sequelize,
            freezeTableName:true,
            timestamps: false,
        }
    );
    return Data_before_tests;
};
