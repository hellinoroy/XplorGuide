const express = require("express")
const destinationRoute = express.Router()
const { createDestination, deleteDestination, updateDestination, getRecommendation, searchDestination, viewDestination } = require("../controllers/destinationController")
const { upload } = require("../utils/fileUpload")
const { authMiddleware, permissionRole } = require("../middleware/userMiddleware")


destinationRoute.get("/recommendation", authMiddleware, getRecommendation)
destinationRoute.get("/search", searchDestination)
destinationRoute.get("/:id", viewDestination)


destinationRoute.post("/destination", authMiddleware, upload.single('tempat_foto'), createDestination)

destinationRoute.delete("/destination/:id", authMiddleware, deleteDestination)
destinationRoute.put("/destination/:id", authMiddleware, upload.single("tempat_foto"), updateDestination)


module.exports = destinationRoute;