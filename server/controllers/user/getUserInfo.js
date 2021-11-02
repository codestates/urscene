const db = require("../../db")
const { decrypt, isAuthorized } = require("../../lib/jwt")

require("dotenv").config()

module.exports = async (req, res) => {
	try {
		const cookieUUID = req.cookies.uuid
		const userToken = isAuthorized(req)
		if (!userToken) {
			return res.status(400).json({ message: "not-authorized" })
		}

		const { id, uuid } = userToken
		const decryptedUUID = await decrypt(uuid, process.env.ENCRYPTION_KEY)

		if (decryptedUUID === cookieUUID) {
			const user = await db.getUserById(id)
			const { email, nickname, image } = user.dataValues
			return res.status(200).json({ id, email, nickname, image })
		}
		return res.status(400).json({ message: "invalid-token" })
	} catch (err) {
		res.status(500).json({ message: "server-error" })
	}
}
