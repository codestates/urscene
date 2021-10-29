const { validatorForEmail } = require("../../lib/regex")
const db = require("../../db")
require("dotenv").config()

module.exports = {
	checkTakenEmail: async (req, res) => {
		try {
			const { email } = req.body
			const validatedEmail = validatorForEmail(email)
			const takenEmail = await db.getUserByEmail(email)
			if (takenEmail && validatedEmail) {
				return res.status(409).json({ email, message: "email-aready-exists" })
			}
			return res.status(200).json({ message: "available-email" })
		} catch (err) {
			res.status(500).json({ message: "server-error" })
		}
	},
}
