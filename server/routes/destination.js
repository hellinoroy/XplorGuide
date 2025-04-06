const express = require("express")
const destinationRoute = express.Router()
const { createDestination, deleteDestination, updateDestination, getDestination } = require("../controllers/destinationController")
const { upload } = require("../utils/fileUpload")
const { authMiddleware, permissionRole } = require("../middleware/userMiddleware")

destinationRoute.post("/destination", authMiddleware, permissionRole("admin"), upload.single('tempat_foto'), createDestination)
destinationRoute.get("/destination", authMiddleware, permissionRole("admin", "user"), getDestination)
destinationRoute.delete("/destination/:id", authMiddleware, permissionRole("admin"), deleteDestination)
destinationRoute.put("/destination/:id", authMiddleware, permissionRole("admin"), upload.single("tempat_foto"), updateDestination)


module.exports = destinationRoute;