const express = require("express")
const roleRoute = express.Router()
const { createRole } = require("../controllers/roleController")
const { authMiddleware, permissionRole } = require("../middleware/userMiddleware")

roleRoute.post("/role", authMiddleware, permissionRole("admin"), createRole)

module.exports = roleRoute