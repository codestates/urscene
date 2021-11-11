const bcrypt = require("bcrypt")
const db = require("../../db")
const { validator } = require("../../lib/regex")

module.exports = async (req, res) => {
	try {
		let { image } = req.body
		let { password } = req.body
		const { email, nickname } = req.body

		const isInvalid = validator(email, password, nickname)
		if (isInvalid) {
			return res.status(isInvalid.code).json({ message: isInvalid.message })
		}

		const userByEmail = await db.getUserByEmail(email)
		if (userByEmail) {
			return res.status(409).send({ email, message: "email-aready-exists" })
		}

		const userByName = await db.getUserByName(nickname)
		if (userByName) {
			return res.status(409).send({ nickname, message: "name-aready-exists" })
		}

		if (image.length === 0) {
			image = "1"
		}
		const salt = await bcrypt.genSalt(10)
		password = await bcrypt.hash(password, salt)
		await db.addUser({ email, nickname, password, image })
		res.status(201).json({ nickname, message: "user-created" })
	} catch (err) {
		res.status(500).json({ message: "server-error" })
	}
}
