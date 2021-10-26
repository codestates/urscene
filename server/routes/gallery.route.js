const express = require("express")
const gallerycontroller = require("../controllers/gallerys/gallery")
const router = express.Router()

router.post("/", gallerycontroller.post)
router.post("/:galleryid", gallerycontroller.addphoto)
router.get("/:galleryid", gallerycontroller.get)
router.patch("/:galleryid", gallerycontroller.patch)
router.delete("/:galleryid", gallerycontroller.delete)

module.exports = router
