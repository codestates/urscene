const express = require("express")
const commentcontroller = require("../controllers/comment.controller")
const router = express.Router()

router.post("/", commentcontroller.post)
router.get("/:singlepostid", commentcontroller.get)
router.delete("/:commentid", commentcontroller.delete)

module.exports = router
