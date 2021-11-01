const jwt = require("jsonwebtoken")
// const bcrypt = require("bcrypt")
const db = require("../../db")
const { decrypt, isAuthorized } = require("../../lib/jwt")

require("dotenv").config()

module.exports = async (req, res) => {
	try {
		const userToken = isAuthorized(req)
		if (!userToken) {
			return res.status(400).json({ message: "not-authorized" })
		}
		const { email, uuid } = userToken
		const decryptedUUID = await decrypt(uuid, process.env.ENCRYPTION_KEY)

		if (uuid === decryptedUUID) {
			const user = await db.getUserByEmail(email)
			const userinfo = user.dataValues
			return res.status(200).json({ userinfo })
		}
		return res.status(400).json({ message: "invalid-token" })
	} catch (err) {
		res.status(500).json({ message: "server-error" })
	}
}
