const db = require("../../db")
const { emailRegex } = require("../../lib/regex")
require("dotenv").config()

module.exports = async (req, res) => {
	try {
		const { email } = req.body
		const takenEmail = await db.getUserByEmail(email)
		if (takenEmail) {
			return res.status(409).json({ email, message: "email-already-exists" })
		}

		const validEmail = await emailRegex(email)
		if (!validEmail) {
			return res.status(400).json({ message: "invalid-email" })
		}

		return res.status(200).json({ email, message: "available-email" })
	} catch (err) {
		res.status(500).json({ message: "sever-error" })
	}
}
