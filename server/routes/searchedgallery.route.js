const express = require("express")
const searchcontroller = require("../controllers/searchedgallery.controller")
const router = express.Router()

router.get("/", searchcontroller.get)

module.exports = router
