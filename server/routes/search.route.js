const express = require("express")
const searchcontroller = require("../controllers/search.controller")
const router = express.Router()

router.get("/", searchcontroller.get)

module.exports = router
