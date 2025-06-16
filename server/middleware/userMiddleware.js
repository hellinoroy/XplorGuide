const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { sequelize } = require("../models");

exports.authMiddleware = async (req, res, next) => {
    try {
        // console.log("middleware")
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                message: "Invalid token: Token not provided",
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);

        const currentUser = await User.findByPk(decoded.id);

        if (!currentUser) {
            return res.status(401).json({
                message: "Anda belum login",
            });
        }

        // ✅ Attach user to request
        req.user = currentUser;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Token tidak valid",
            error: error.message,
        });
    }
};
