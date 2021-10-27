const express = require("express")
const likecontroller = require("../controllers/like.controller")
const router = express.Router()

router.post("/single/:singlepostid", likecontroller.singlepost)
router.post("/gallery/:galleryid", likecontroller.gallerypost)
router.delete("/single/:singlelikeid", likecontroller.singlelike)
router.delete("/gallery/:gallerylikeid", likecontroller.gallerylike)

module.exports = router
