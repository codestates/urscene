const express = require("express")
const commentcontroller = require("../controllers/comment.controller")
const router = express.Router()

router.post("/", commentcontroller.post)
router.get("/:id", commentcontroller.get)
router.delete("/:id", commentcontroller.delete)

module.exports = router
