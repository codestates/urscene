const { validatorForPassword } = require("../../lib/regex")
const db = require("../../db")
require("dotenv").config()

module.exports = {
	signUp: async (req, res) => {
		try {
			const { email, nickname, password, image } = req.body

			const isInvalid = validatorForPassword(password)
			if (isInvalid) {
				return res.status(isInvalid.code).json({ message: isInvalid.message })
			}
			await db.addUser({ email, nickname, password, image })
			res.status(201).json({ nickname, message: "user-created" })
		} catch (err) {
			res.status(500).json({ message: "server-error" })
		}
	},
}
