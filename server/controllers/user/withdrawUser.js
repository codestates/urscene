const db = require("../../db")
const { isAuthorized } = require("../../lib/jwt")

module.exports = async (req, res) => {
	try {
		const userToken = isAuthorized(req)
		if (!userToken) {
			return res.status(400).json({ message: "not-authorized" })
		}

		const { id, uuid } = userToken
		const decryptedUUID = await decrypt(uuid, process.env.ENCRYPTION_KEY)
		const cookieUUID = req.cookies.uuid

		if (decryptedUUID === cookieUUID) {
			await db.deleteUser(id)
			res
				.clearCookie("token", {
					httpOnly: true,
					sameSite: "none",
					secure: true,
					path: "/",
					domain: "urscene.link",
				})
				.status(205)
				.json({ message: "user-deleted-successfully" })
		}
		res.status(401).json({ message: "invalid-token" })
	} catch (err) {
		res.status(500).json({ message: "server-error" })
	}
}
