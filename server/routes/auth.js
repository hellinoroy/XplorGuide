const express = require("express");
const authRouter = express.Router();
const {
    register,
    login,
    logout,
    me,
} = require("../controllers/authController");
const { authMiddleware } = require("../middleware/userMiddleware");

authRouter.post("/register", register);
authRouter.post("/login", login);

authRouter.get("/me", authMiddleware, me);

authRouter.post("/logout", authMiddleware, logout);

module.exports = authRouter;
