const express = require("express")
const usercontroller = require("../controllers/user.controller")
const router = express.Router()

router.post("/signin", usercontroller.signin)
router.post("/signout", usercontroller.signout)
router.post("/", usercontroller.signup)
router.get("/", usercontroller.info)
router.delete("/", usercontroller.delete)
router.get("/gallery", usercontroller.gallery)
router.patch("/", usercontroller.patch)

module.exports = router
