const express = require("express")
const { signUp, signIn, signOut, deleteUser, patchUser } = require("../controllers/user.controller")
const router = express.Router()

router.post("/", signUp)
// router.post("/signin", signIn)
// router.post("/signout", signOut)

// router.get("/", signUp) // 회원 정보
// router.delete("/", deleteUser)
// router.get("/gallery", signUp) //마이 갤러리
// router.patch("/", patchUser)

module.exports = router
