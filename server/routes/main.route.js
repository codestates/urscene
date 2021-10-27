const express = require("express")
const maincontroller = require("../controllers/main.controller")
const router = express.Router()

router.get("/:genre", maincontroller.genre)
router.get("/:gallery", maincontroller.gallery)

module.exports = router
