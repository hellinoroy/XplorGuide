'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  User.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Input username harus diisi"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Input harus berformat Email"
        },
        notNull: {
          msg: "Input email harus diisi"
        }
      },
      unique: {
        msg: "Email sudah terdaftar"
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Input alamat harus diisi"
        }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Input umur harus diisi"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Input password harus diisi"
        },
        len: {
          args: [8],
          msg: "Password minimal 8 karakter"
        }
      },
    },
    role: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      references: {
        model: {
          tableName: 'Role',
        },
        key: 'id'
      }
    }
  },

    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate: async (user) => {
          const hashPassword = await bcrypt.hash(user.password, 10);
          user.password = hashPassword;

          if (user.username === "admin") {
            const roleName = await sequelize.models.Role.findOne({
              where: { name: "admin" }
            });
            user.role = roleName.id;
          } else {
            const roleName = await sequelize.models.Role.findOne({
              where: { name: "user" }
            });
            user.role = roleName.id;
          }
        },
      },
      freezeTableName: true,
      timestamps: false
    },

  );
  return User;
};