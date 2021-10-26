const express = require("express")
const maincontroller = require("../controllers/main/main")
const router = express.Router()

router.get("/", maincontroller.get)

module.exports = router
