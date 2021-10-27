const express = require("express")
const maincontroller = require("../controllers/main.controller")
const router = express.Router()

router.get("/single/:genre", maincontroller.genre)
router.get("/", maincontroller.rank)

module.exports = router
