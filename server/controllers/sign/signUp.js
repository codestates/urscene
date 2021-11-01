const { validator } = require("../../lib/regex")
const db = require("../../db")
require("dotenv").config()

module.exports = async (req, res) => {
	try {
		const { email, nickname, password, image } = req.body

		const isInvalid = validator(email, password, nickname)
		if (isInvalid) {
			return res.status(isInvalid.code).json({ message: isInvalid.message })
		}
		// 만약 이미지가 없는 경우 디폴트 이미지 정해줘서 보내줘야 할까? (프론트분들과 상의)
		// 비밀번호 암호화 해서 넣기
		const userByEmail = await db.getUserByEmail(email)
		if (userByEmail) {
			return res.status(409).send({ email, message: "email-aready-exists" })
		}

		const userByName = await db.getUserByName(nickname)
		if (userByName) {
			return res.status(409).send({ nickname, message: "name-aready-exists" })
		}

		await db.addUser({ email, nickname, password, image })
		res.status(201).json({ nickname, message: "user-created" })
	} catch (err) {
		res.status(500).json({ message: "server-error" })
	}
}
