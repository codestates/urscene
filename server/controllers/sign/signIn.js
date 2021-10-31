const jwt = require("jsonwebtoken")
const { validatorForPassword } = require("../../lib/regex")
const bcrypt = require("bcrypt")
const db = require("../../db")
require("dotenv").config()

module.exports = async (req, res) => {
	const { email, password } = req.body
	console.log(req.headers)
	const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress
	const authenticatedUser = await db.authenticateUser(email, password)
	const user = authenticatedUser[0].dataValues
	// 여기서 비밀번호 암호화해서 디비에 저장

	try {
		// request로부터 받은 userId, password와 일치하는 유저가 DB에 존재하는지 확인
		// 일치하는 유저가 없을 경우:
		// 로그인 요청을 거절
		if (!authenticatedUser) {
			return res.status(400).send({ email, message: "invalid-data" })
		}
		// 일치하는 유저가 있을 경우:
		// 사용자의 id와 nickname 추출
		const { id, nickname, image } = user
		console.log(id, nickname, image, email, password)
		const accessToken = jwt.sign({ userId, userName }, process.env.JWT_SECRET, { expiresIn: "1h", issuer: "cotak" })

		// IP 주소 및 UUID가 포함 된 Payload를 구성하고 토큰 발행 방법에 따라 IUWT 토큰을 브라우저를 통해 클라이언트에 전송 한다. 로그인이 성공한 시점의 IP 주소를 AES 알고리즘으로 암호화하여 토큰 내부에 저장하기 때문에 토큰 이 탈취되더라도 IP 주소를 판독하지 못한다.

		// 웹 브라우저(클라이언트)에 토큰 세팅
		res.cookie("accessToken", accessToken)
		res.cookie("refreshToken", refreshToken)

		return res.status(200).json({ message: "log-in-successfully" })
	} catch (err) {
		res.status(500).json({ message: "server-error" })
	}
}
