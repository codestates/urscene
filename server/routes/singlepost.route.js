const express = require("express")
const singlepostcontroller = require("../controllers/singleposts/singlepost")
const router = express.Router()

router.post("/", singlepostcontroller.post)
router.get("/", singlepostcontroller.title)
router.get("/:singlepostid", singlepostcontroller.get)
router.patch("/:singlepostid", singlepostcontroller.patch)
router.delete("/:singlepostid", singlepostcontroller.delete)

module.exports = router
