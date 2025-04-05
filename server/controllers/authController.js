const { User } = require("../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const accessToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_ACCESS_TOKEN, {
        expiresIn: "7d"
    })
}

exports.register = async (req, res) => {
    try {
        const { username, email, address, age, password, confirmPassword } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                message: "Email Sudah Terdaftar"
            });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Password dan Confirm Password Tidak Sama"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const addUser = await User.create({
            username,
            email,
            address,
            age,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "Register Berhasil",
            data: addUser
        });
    } catch (error) {
        return res.status(500).json({
            message: "Gagal Register User",
            error: error.message
        });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userData = await User.findOne({ where: { email } });
        if (!userData) {
            return res.status(400).json({
                message: "Email atau Password Salah"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, userData.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Email atau Password Salah"
            });
        }

        const token = accessToken(userData);

        return res.status(200).json({
            message: "Login Berhasil",
            user: {
                id: userData.id,
                username: userData.username,
                email: userData.email,
                address: userData.address,
                age: userData.age
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