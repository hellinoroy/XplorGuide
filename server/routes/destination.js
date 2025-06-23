const express = require("express")
const destinationRoute = express.Router()
const { createDestination, deleteDestination, updateDestination, getRecommendation, searchDestination, viewDestination, dataSebelum } = require("../controllers/destinationController")
const { upload } = require("../utils/fileUpload")
const { authMiddleware, permissionRole } = require("../middleware/userMiddleware")


destinationRoute.get("/recommendation/:modelName", authMiddleware, getRecommendation)
destinationRoute.get("/search", searchDestination)
destinationRoute.get("/data-sebelum", dataSebelum)
destinationRoute.get("/:id", viewDestination)


destinationRoute.post("/destination", authMiddleware, upload.single('tempat_foto'), createDestination)

destinationRoute.delete("/destination/:id", authMiddleware, deleteDestination)
destinationRoute.put("/destination/:id", authMiddleware, upload.single("tempat_foto"), updateDestination)


module.exports = destinationRoute;