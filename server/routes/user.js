const express = require("express")
const userRoute = express.Router()
const { putBookmark, putRating, postComment, getAttributes, deleteComment } = require("../controllers/userController")
const { authMiddleware, permissionRole } = require("../middleware/userMiddleware")


userRoute.get("/attribute/:tempat_id", authMiddleware, getAttributes)

userRoute.put("/bookmark/:tempat_id", authMiddleware,  putBookmark)
userRoute.put("/rating/:tempat_id", authMiddleware, putRating)
userRoute.post("/comment/:tempat_id", authMiddleware, postComment)
userRoute.delete("/comment/:tempat_id/:comment_id/:user_id", authMiddleware, deleteComment)

module.exports = userRoute