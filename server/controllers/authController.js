const { User, Role } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const accessToken = (user) => {
    return jwt.sign({ id: user.user_id }, process.env.JWT_ACCESS_TOKEN, {
        expiresIn: "7d",
    });
};

exports.register = async (req, res) => {
    try {
        const data = req.body;

        await User.create({
            user_username: data.username,
            user_email: data.email,
            user_address: data.address,
            user_age: data.age,
            user_password: data.password,
        });

        return res.status(201).json({
            message: "Register Berhasil",
        });
    } catch (error) {
        console.error("Error Register:", error);
        let errorMessage = "Error: Gagal register";
        if (error.name === "SequelizeValidationError") {
            errorMessage = error.errors.map((err) => err.message);
        }
        return res.status(500).json({
            message: errorMessage,
        });
    }
};

exports.login = async (req, res) => {
    try {
        const data = req.body;
        const userData = await User.findOne({
            where: { user_email: data.email },
        });

        if (
            userData !== null &&
            (await bcrypt.compare(data.password, userData.user_password))
        ) {
            const token = accessToken(userData);
            return res.status(200).json({
                message: "Login Berhasil",
                accessToken: token,
            });
        } else {
            return res.status(400).json({
                message: "Email atau Password Salah",
            });
        }
    } catch (error) {
        console.error("Error Login:", error);
        let errorMessage = "Error: Gagal login";
        if (error.name === "SequelizeValidationError") {
            errorMessage = error.message;
        }
        return res.status(500).json({
            message: errorMessage,
        });
    }
};

exports.me = async (req, res) => {
    try {
        const getCurrentUserById = await User.findByPk(req.user.user_id, {
            attributes: {
                exclude: ["user_id", "user_password", "role_id"],
            },
            include: [{
                model: Role,
                attributes: ["role_name"]
            }]
        });
        if (!getCurrentUserById) {
            return res.status(404).json({
                message: "User Tidak Ditemukan",
            });
        }
        return res.status(200).json({
            message: "Berhasil mendapatkan data user",
            data: getCurrentUserById,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Gagal mendapatkan data user",
            error: error.message,
        });
    }
};

exports.logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({
                message: "Token tidak ditemukan",
            });
        }
        return res.status(200).json({
            message: "Logout Berhasil",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Gagal Logout User",
            error: error.message,
        });
    }
};
