const express = require("express")
const comment = require("./comment/index")
const main = require("./main/index")
// const oauth = require("./oauth/index")
const singlepost = require("./singlepost/index")
const sign = require("./sign/index")
const router = express.Router()

//comment
router.post("/comment", comment.commentpost)
router.get("/comment/:singlepostid", comment.commentget)
router.delete("/comment/:commentid", comment.commentdelete)

//main
router.get("/main/single/:genre", main.genre)
router.get("/main", main.rank)

//singlepost
router.post("/like/single/:singlepostid", singlepost.singlepost)
router.delete("/like/single/:singlelikeid", singlepost.singlelike)
router.get("/searched_singlepost", singlepost.get)
router.post("/singlepost", singlepost.post)
router.get("/singlepost", singlepost.movietitle)
router.get("/singlepost/:singlepostid", singlepost.get)
router.patch("/singlepost/:singlepostid", singlepost.patch)
router.delete("/singlepost/:singlepostid", singlepost.delete)

//sign
router.post("/signup", sign.signUp)
router.post("/signup/takenemail", sign.isTakenEmail)
router.post("/signup/takenname", sign.isTakenName)
router.post("/signin", sign.signIn)

//user
module.exports = router
