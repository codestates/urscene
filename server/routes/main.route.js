const express = require("express")
const maincontroller = require("../controllers/main.controller")
const router = express.Router()

router.get("/:genre", maincontroller.get)

module.exports = router
