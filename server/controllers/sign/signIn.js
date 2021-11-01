const jwt = require("jsonwebtoken")
// const bcrypt = require("bcrypt")
const db = require("../../db")
const cookieParser = require("cookie-parser")
const { encrypt, uuid, sendToken, sendUUID } = require("../../lib/jwt")

require("dotenv").config()

module.exports = async (req, res) => {
	const { email, password } = req.body
	const authenticatedUser = await db.authenticateUser(email, password)

	try {
		// request로부터 받은 userId, password와 일치하는 유저가 DB에 존재하는지 확인
		// 일치하는 유저가 없을 경우:
		// 로그인 요청을 거절
		if (!authenticatedUser) {
			return res.status(400).send({ email, message: "not-authorized" })
		}

		// encrypt
		const sortedUUID = uuid()
		const encryptedUUID = await encrypt(sortedUUID, process.env.ENCRYPTION_KEY)

		// PayLoad의 Private Claims에 UUID를 AES-256 암호화해 삽입하여 생성한 JWT를 Cookie로 내려준다.
		const token = jwt.sign({ uuid: encryptedUUID, email: email }, process.env.JWT_SECRET, {
			expiresIn: "1d",
			issuer: "urscene",
		})

		// IUWT 토큰을 브라우저를 통해 클라이언트에 전송 한다.
		// 웹 브라우저(클라이언트)에 토큰 세팅
		sendToken(res, token)
		sendUUID(res, sortedUUID)
		return res.status(200).json({ message: "log-in-successfully" })
	} catch (err) {
		res.status(500).json({ message: "server-error" })
	}
}
