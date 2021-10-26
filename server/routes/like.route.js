const express = require("express")
const likecontroller = require("../controllers/like.controller")
const router = express.Router()

router.post("/:singlepostlikeid", likecontroller.post)
router.post("/:gallerylikeid", likecontroller.post)
router.delete("/:singlepostlikeid", likecontroller.delete)
router.delete("/:gallerylikeid", likecontroller.delete)

module.exports = router
