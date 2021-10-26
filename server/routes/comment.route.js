const express = require("express")
const commentcontroller = require("../controllers/comments/comment")
const router = express.Router()

router.post("/", commentcontroller.post)
router.get("/:id", commentcontroller.get)
router.delete("/:id", commentcontroller.delete)

module.exports = router
