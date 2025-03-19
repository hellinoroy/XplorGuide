const express = require("express")
const authRouter = express.Router()
const { register, login, logout, currentUser } = require("../controllers/authController")
const { authMiddleware } = require("../middleware/userMiddleware")

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.get("/current-user/:id", authMiddleware, currentUser)
authRouter.post("/logout", authMiddleware, logout)

module.exports = authRouter