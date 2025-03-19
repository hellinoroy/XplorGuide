const { Role } = require("../models")


exports.createRole = async (req, res) => {
    try {
        const addRole = await Role.create({
            name: req.body.name
        })
        return res.status(201).json({
            message: "Berhasil Membuat Role",
            data: addRole
        })
    } catch (error) {
        return res.status(500).json({
            message: "Gagal Membuat Role",
            error: error.message
        })
    }
}