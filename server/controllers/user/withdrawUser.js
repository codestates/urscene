const db = require("../../db")
const { isAuthorized } = require("../../lib/jwt")

module.exports = async (req, res) => {
	try {
		const userToken = isAuthorized(req)
		const { id } = userToken
		await db.deleteUser(id)
		res.clearCookie("token")
		res.clearCookie("uuid").status(205).json({ message: "user-deleted-successfully" })
	} catch (err) {
		res.status(500).json({ message: "server-error" })
	}
}
