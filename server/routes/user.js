const express = require("express")
const userRoute = express.Router()
const { addBookmark, addRating, addComment } = require("../controllers/userController")
const { authMiddleware, permissionRole } = require("../middleware/userMiddleware")

userRoute.post("/bookmark/:tempat_id", authMiddleware, permissionRole("admin", "user"), addBookmark)
userRoute.post("/rating/:tempat_id", authMiddleware, permissionRole("admin", "user"), addRating)
userRoute.post("/comment/:tempat_id", authMiddleware, permissionRole("admin", "user"), addComment)

module.exports = userRoute