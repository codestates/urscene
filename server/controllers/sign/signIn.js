const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("../../db")
const { encrypt, uuid, sendToken, sendUUID } = require("../../lib/jwt")
require("dotenv").config()

module.exports = async (req, res) => {
	const { email, password } = req.body
	const userInfo = await db.getUserByEmail(email)
	// const validPassword = await bcrypt.compare(password, userInfo.dataValues.password)

	try {
		// if (!validPassword) {
		// 	return res.status(400).send("not-authorized")
		// }

		const { id } = userInfo.dataValues
		const sortedUUID = uuid()
		const encryptedUUID = await encrypt(sortedUUID, process.env.ENCRYPTION_KEY)
		const token = jwt.sign({ id: id, uuid: encryptedUUID }, process.env.JWT_SECRET, {
			expiresIn: "1d",
			issuer: "urscene",
		})

		sendToken(res, token)
		sendUUID(res, sortedUUID)
		return res.status(200).json({ message: "log-in-successfully" })
	} catch (err) {
		res.status(500).json({ message: "server-error" })
	}
}
