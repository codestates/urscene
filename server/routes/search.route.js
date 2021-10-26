const express = require("express")
const searchcontroller = require("../controllers/search/search")
const router = express.Router()

router.get("/", searchcontroller.get)

module.exports = router
