const express = require("express");
const comment = require("./comment/index");
const main = require("./main/index");
const singlepost = require("./singlepost/index");
const sign = require("./sign/index");
const search = require("./search/index");
const description = require("./description/getDescription");
const gallery = require("./gallery/index");
const user = require("./user/index");
const { isAuthorizedUser } = require("../lib/auth");
const router = express.Router();

//sign
router.post("/signup", sign.signUp)
router.post("/signin", sign.signIn)
router.post("/signout", isAuthorizedUser, sign.signOut)
router.post("/signup/takenname", sign.isTakenName)
router.post("/signup/takenemail", sign.isTakenEmail)
router.post("/sign/kakao", sign.kakao)


//user
router.get("/user", isAuthorizedUser, user.getUserInfo);
router.patch("/user", isAuthorizedUser, user.updateUser);
router.delete("/user", isAuthorizedUser, user.withdrawUser);
router.get("/user/singlepost", isAuthorizedUser, singlepost.mysinglepost);
router.get("/user/gallerypost", isAuthorizedUser, gallery.myGallery);
router.get("/user/like/singlepost", isAuthorizedUser, user.getLikedSinglepost);
router.get("/user/like/gallerypost", isAuthorizedUser, user.getLikedGallery);

//main
router.get("/main/single", main.genre);
router.get("/main", main.rank);

//search
router.get("/search/single", search.singlepost);
router.get("/search/gallery", search.gallery);

//gallery
router.post("/gallery", isAuthorizedUser, gallery.postGallery);
router.post("/gallery/:gallerypost_id", isAuthorizedUser, gallery.addSinglepostToGallery);
router.get("/gallery/:galleryid", gallery.getGallery);
router.patch("/gallery/:galleryid", isAuthorizedUser, gallery.patchGallery);
router.delete("/gallery/:galleryid", isAuthorizedUser, gallery.deleteGallery);
router.delete("/gallery/photo/:galleryid/:singlepostid", isAuthorizedUser, gallery.deletePhoto);
router.post("/gallery/like/:galleryid", isAuthorizedUser, gallery.postLike);
router.get("/gallery/like/:galleryid", isAuthorizedUser, gallery.getLike);
router.delete("/gallery/like/:gallerylikeid", isAuthorizedUser, gallery.deleteLike);

//singlepost
router.post("/singlepost", isAuthorizedUser, singlepost.post);
router.get("/singlepost/:singlepostid", singlepost.get);
router.patch("/singlepost/:singlepostid", isAuthorizedUser, singlepost.patch);
router.delete("/singlepost/:singlepostid", isAuthorizedUser, singlepost.delete);
router.post("/singlepost/like/:singlepostid", isAuthorizedUser, singlepost.singlepost);
router.get("/singlepost/like/:singlepostid", isAuthorizedUser, singlepost.getLike);
router.delete("/singlepost/like/:singlelikeid", isAuthorizedUser, singlepost.singlelike);

//comment
router.post("/comment", isAuthorizedUser, comment.commentpost);
router.delete("/comment/:commentid", isAuthorizedUser, comment.commentdelete);
router.get("/comment/:singlepostid", comment.commentget);

//description
router.get("/description/:title", isAuthorizedUser, description);

module.exports = router;
