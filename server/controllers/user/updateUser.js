const db = require("../../db")
const { decrypt, isAuthorized } = require("../../lib/jwt")
const { passwordRegex } = require("../../lib/regex")
require("dotenv").config()

module.exports = async (req, res) => {
	try {
		const { newName, newPassword, newImage } = req.body

		const userToken = isAuthorized(req)
		if (!userToken) {
			return res.status(400).json({ message: "not-authorized" })
		}

		const { id, uuid } = userToken
		const decryptedUUID = await decrypt(uuid, process.env.ENCRYPTION_KEY)
		const cookieUUID = req.cookies ? req.cookies.uuid : req.headers.uuid

		if (decryptedUUID === cookieUUID) {
			const user = await db.getUserById(id)
			const { nickname } = user.dataValues
			const validPassword = passwordRegex(newPassword)

			if (!validPassword) {
				return res.status(400).json({ newPassword, message: "invalid-new-password" })
			}
			// if (newPassword === password) {
			// 	return res.status(409).json({ newPassword, message: "new-password-must-be-different-from-the-old-one" })
			// }
			if (newName === nickname) {
				return res.status(409).json({ newName, message: "new-name-must-be-different-from-the-old-one" })
			}
			const existentName = await db.getUserByName(newName)
			if (existentName) {
				return res.status(409).send({ newName, message: "name-aready-exists" })
			}
			await db.updateUser({ id, newName, newPassword, newImage })
			return res.status(200).json({ newName, newImage, message: "update-successfully" })
		}
		return res.status(400).json({ message: "invalid-token" })
	} catch (err) {
		res.status(500).json({ message: "server-error" })
	}
}
