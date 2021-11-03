const express = require("express")
const comment = require("./comment/index")
const main = require("./main/index")
const singlepost = require("./singlepost/index")
const sign = require("./sign/index")
const search = require("./search/index")
const description = require("./description/getDescription")
const gallery = require("./gallery/index")
const user = require("./user/index")
const { isAuthorizedUser } = require("../lib/auth")
const router = express.Router()

//comment
router.post("/comment", isAuthorizedUser, comment.commentpost)
router.get("/comment/:singlepostid", comment.commentget)
router.delete("/comment/:commentid", isAuthorizedUser, comment.commentdelete)

//main
router.get("/main/single", main.genre)
router.get("/main", main.rank)

//search
router.get("/search/single", search.singlepost)
router.get("/search/gallery", search.gallery)

//gallery
router.get("/gallery/:galleryid", gallery.getGallery)
router.delete("/gallery/:galleryid", isAuthorizedUser, gallery.deleteGallery)
router.delete("/gallery/photo/:galleryid/:singlepostid", isAuthorizedUser, gallery.deletePhoto)
router.patch("/gallery/:galleryid", isAuthorizedUser, gallery.patchGallery)
router.get("/gallery", isAuthorizedUser, gallery.myGallery) // 마이갤러리 경로 바꾸기
router.post("/gallery/like/:galleryid", isAuthorizedUser, gallery.postLike)
router.delete("/gallery/like/:galleryid", isAuthorizedUser, gallery.deleteLike)
router.get("/gallery/like/:galleryid", isAuthorizedUser, gallery.getLike)

//singlepost
router.post("/singlepost/like/:singlepostid", isAuthorizedUser, singlepost.singlepost)
router.delete("/singlepost/like/:singlelikeid", isAuthorizedUser, singlepost.singlelike)
router.get("/singlepost/like/:singlepostid", isAuthorizedUser, singlepost.getLike)
router.post("/singlepost", isAuthorizedUser, singlepost.post)
// router.get("/singlepost", singlepost.movietitle)
router.get("/singlepost/:singlepostid", singlepost.get)
router.patch("/singlepost/:singlepostid", isAuthorizedUser, singlepost.patch)
router.delete("/singlepost/:singlepostid", isAuthorizedUser, singlepost.delete)
router.get("/singlepost", isAuthorizedUser, singlepost.mysinglepost)

//sign
router.post("/signup", sign.signUp)
router.post("/signin", sign.signIn)
router.post("/signout", isAuthorizedUser, sign.signOut)
router.post("/signup/takenname", sign.isTakenName)
router.post("/signup/takenemail", sign.isTakenEmail)

//user
router.get("/user", isAuthorizedUser, user.getUserInfo)
router.patch("/user", isAuthorizedUser, user.updateUser)
router.delete("/user", isAuthorizedUser, user.withdrawUser)

//gallery
router.post("/gallery", isAuthorizedUser, gallery.postGallery)
router.post("/gallery/:gallerypost_id", isAuthorizedUser, gallery.addSinglepostToGallery)

//description
router.get("/description/:title", isAuthorizedUser, description)

//user
module.exports = router
