const express = require("express")
const { getMovieData } = require("../controllers/description.controller")
const router = express.Router()

router.get("/", getMovieData)

module.exports = router
