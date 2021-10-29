const express = require("express")
const comment = require("./comment/index")
const main = require("./main/index")
// const oauth = require("./oauth/index")
const singlepost = require("./singlepost/index")
const search = require("./search/index")

const router = express.Router()

//comment
router.post("/comment", comment.commentpost)
router.get("/comment/:singlepostid", comment.commentget)
router.delete("/comment/:commentid", comment.commentdelete)

//main
router.get("/main/single/:genre", main.genre)
router.get("/main", main.rank)

//search
router.get("/search/single", search.singlepost)
router.get("/search/gallery", search.gallery)

//singlepost
router.post("/singlepost/like/:singlepostid", singlepost.singlepost)
router.delete("/singlepost/like/:singlelikeid", singlepost.singlelike)
router.post("/singlepost", singlepost.post)
router.get("/singlepost", singlepost.movietitle)
router.get("/singlepost/:singlepostid", singlepost.get)
router.patch("/singlepost/:singlepostid", singlepost.patch)
router.delete("/singlepost/:singlepostid", singlepost.delete)

module.exports = router
