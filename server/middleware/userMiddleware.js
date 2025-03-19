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
    let decoded
    try {
        decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN)
    } catch (error) {
        return res.status(401).json({
            message: "Token invalid atau expired token"
        })
    }
    const currentUser = await User.findByPk(decoded.user.id)
    if (!currentUser) {
        return next(res.status(401).json({
            message: "anda belum login"
        }))
    }

    req.user = currentUser
    next()
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
