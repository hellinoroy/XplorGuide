const express = require("express")
const roleRoute = express.Router()
const { createRole } = require("../controllers/roleController")


roleRoute.post("/role", createRole)

module.exports = roleRoute