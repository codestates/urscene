const express = require("express")
const { checkTakenNm, checkTakenEmail, signUp, signIn, signOut, deleteUser, patchUser } = require("../controllers/sign")
const router = express.Router()

router.post("/signup", signUp)
router.post("/signin", signIn)
router.post("/takename", checkTakenNm)
router.post("/takenemail", checkTakenEmail)
// signup 엔드 포인트에 Post 함수를 세 개 쓰려면 어떡해야 되지..

// router.post("/signout", signOut)

// router.get("/", signUp) // 회원 정보
// router.delete("/", deleteUser)
// router.get("/gallery", signUp) //마이 갤러리
// router.patch("/", patchUser)

module.exports = router
