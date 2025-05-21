"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.hasMany(models.Bookmark, { foreignKey: "user_id" });
            User.hasMany(models.Rating, { foreignKey: "user_id" });
            User.hasMany(models.Comment, { foreignKey: "user_id" });
            User.belongsTo(models.Role, { foreignKey: "role_id" })
        }
    }
    User.init(
        {
            user_id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
            },
            user_username: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Input username harus diisi",
                    },
                },
                unique: {
                    msg: "Username sudah terpakai",
                },
            },
            user_email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: {
                        msg: "Input harus berformat Email",
                    },
                    notNull: {
                        msg: "Input email harus diisi",
                    },
                },
                unique: {
                    msg: "Email sudah terpakai",
                },
            },
            user_address: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Input alamat harus diisi",
                    },
                },
            },
            user_age: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Input umur harus diisi",
                    },
                },
            },
            user_password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Input password harus diisi",
                    },
                    len: {
                        args: [8],
                        msg: "Password minimal 8 karakter",
                    },
                },
            },
            role_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
        },
        {
            sequelize,
            modelName: "User",
            freezeTableName: true,
            hooks: {
                beforeCreate: async (user) => {
                    user.user_password = await bcrypt.hash(user.user_password, 10);

                    if (user.user_username === "admin") {
                        const roleName = await sequelize.models.Role.findOne({
                            where: { role_name: "admin" },
                        });
                        user.role_id = roleName.role_id;
                    } else {
                        const roleName = await sequelize.models.Role.findOne({
                            where: { role_name: "user" },
                        });
                        user.role_id = roleName.role_id;
                    }
                },
            },
        }
    );
    return User;
};
