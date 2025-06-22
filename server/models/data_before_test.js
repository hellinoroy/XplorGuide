'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Data_before_test extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Data_before_test.init({
    user_id: DataTypes.INTEGER,
    place_id: DataTypes.INTEGER,
    place_rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'data_before_test',
    tableName:'data_before_tests',
    timestamp: false
  });
  return Data_before_test;
};