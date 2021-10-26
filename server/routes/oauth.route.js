const express = require("express")
const oauthcontroller = require("../controllers/oauth.controller")
const router = express.Router()

router.get("/", oauthcontroller.google)
router.get("/", oauthcontroller.kakao)

module.exports = router
