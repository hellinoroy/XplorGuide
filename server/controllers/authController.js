const { User } = require("../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const accessToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_ACCESS_TOKEN, {
        expiresIn: "7d"
    })
}

exports.register = async (req, res) => {
    try {
        const addUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            address: req.body.address,
            age: req.body.age,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        })
        const existingUser = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).json({
                message: "Password dan Confirm Password Tidak Sama"
            })
        }
        if (existingUser === existingUser.email) {
            return res.status(400).json({
                message: "Email Sudah Terdaftar"
            })
        }
        return res.status(200).json({
            message: "Register Berhasil",
            data: addUser
        })
    } catch (error) {
        return res.status(500).json({
            message: "Gagal Register User",
            error: error.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        const userData = await User.findOne({
            where: { email: req.body.email }
        });

        if (!userData || !(await bcrypt.compare(req.body.password, userData.password))) {
            return res.status(400).json({
                message: "Email atau Password Salah"
            });
        }
        userData.password = undefined;
        const token = accessToken(userData);
        return res.status(200).json({
            message: "Login Berhasil",
            user: {
                userData
            },
            accessToken: token
        });
    } catch (error) {
        return res.status(500).json({
            message: "Gagal Login User",
            error: error.message
        });
    }
};

exports.currentUser = async (req, res) => {
    try {
        const { id } = req.params
        const getCurrentUserById = await User.findByPk(id)
        if (!getCurrentUserById) {
            return res.status(404).json({
                message: "User Tidak Ditemukan"
            })
        }
        getCurrentUserById.password = undefined;
        return res.status(200).json({
            message: "Berhasil mendapatkan data user",
            data: getCurrentUserById
        })
    } catch (error) {
        return res.status(500).json({
            message: "Gagal mendapatkan data user",
            error: error.message
        })
    }
}

exports.logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({
                message: "Token tidak ditemukan"
            })
        }
        return res.status(200).json({
            message: "Logout Berhasil"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Gagal Logout User",
            error: error.message
        })
    }
}