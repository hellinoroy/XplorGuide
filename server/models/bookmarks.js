'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  bookmark.init({
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      references: {
        model: {
          tableName: 'User',
        },
        key: 'id',
      }
    },
    tempat_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'daftar_tempat',
        },
        key: 'tempat_id',
      }
    },
  }, {
    sequelize,
    modelName: 'bookmarks',
    freezeTableName: true,
    timestamps: false,
  });
  return bookmark;
};