const express = require("express");
const comment = require("./comment/index");
const main = require("./main/index");
const singlepost = require("./singlepost/index");
const sign = require("./sign/index");
const search = require("./search/index");
const description = require("./description/getDescription");
const gallery = require("./gallery/index");
const user = require("./user/index");
const router = express.Router();

//comment
router.post("/comment", comment.commentpost);
router.get("/comment/:singlepostid", comment.commentget);
router.delete("/comment/:commentid", comment.commentdelete);

//main
router.get("/main/single", main.genre);
router.get("/main", main.rank);

//search
router.get("/search/single", search.singlepost);
router.get("/search/gallery", search.gallery);

//gallery
router.get("/gallery/:galleryid", gallery.getGallery);
router.delete("/gallery/:galleryid", gallery.deleteGallery);
router.delete("/gallery/photo/:galleryid/:singlepostid", gallery.deletePhoto);
router.patch("/gallery/:galleryid", gallery.patchGallery);
router.get("/gallery", gallery.myGallery);
router.post("/gallery/like/:galleryid", gallery.postLike);
router.delete("/gallery/like/:gallerylikeid", gallery.deleteLike);
router.get("/gallery/like/:galleryid", gallery.getLike);

//singlepost
router.post("/singlepost/like/:singlepostid", singlepost.singlepost);
router.delete("/singlepost/like/:singlelikeid", singlepost.singlelike);
router.get("/singlepost/like/:singlepostid", singlepost.getLike);
router.post("/singlepost", singlepost.post);
// router.get("/singlepost", singlepost.movietitle)
router.get("/singlepost/:singlepostid", singlepost.get);
router.patch("/singlepost/:singlepostid", singlepost.patch);
router.delete("/singlepost/:singlepostid", singlepost.delete);
router.get("/singlepost", singlepost.mysinglepost);

//sign
router.post("/signup", sign.signUp);
router.post("/signin", sign.signIn);
router.post("/signout", sign.signOut);
router.post("/signup/takenname", sign.isTakenName);
router.post("/signup/takenemail", sign.isTakenEmail);

//user
router.get("/user", user.getUserInfo);
router.patch("/user", user.updateUser);
router.delete("/user", user.withdrawUser);

//gallery
router.post("/gallery", gallery.postGallery)
router.post("/gallery/:gallerypost_id", gallery.addSinglepostToGallery)

//description
router.get("/description/:title", description);

//user
module.exports = router;
