const { User } = require("../models")
const jwt = require("jsonwebtoken")
const { sequelize } = require("../models")


exports.authMiddleware = async (req, res, next) => {
    let token
    token = req.headers.authorization.split(" ")[1]
    if (!token) {
        return res.status(401).json({
            message: "invalid token"
        })
    }
    try {
        let decoded
        decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN)
        const currentUser = await User.findByPk(decoded.id)
        if (!currentUser) {
            return res.status(401).json({
                message: "anda belum login"
            })
        }
        req.user = currentUser
        next()
    } catch (error) {
        return res.status(400).json({
            message: error.stack
        })
    }
}

exports.permissionRole = (...roles) => {
    return async (req, res, next) => {
        try {
            if (!req.user || !req.user.role) {
                return res.status(401).json({
                    message: "role tidak ditemukan"
                });
            }
            const getRoleName = await sequelize.models.Role.findOne({
                where: {
                    id: req.user.role
                }
            });
            if (!getRoleName || !roles.includes(getRoleName.name)) {
                return res.status(403).json({
                    message: "Anda tidak memiliki akses"
                });
            }
            next();
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error: error.message
            });
        }
    };
};
