const db = require("../../db")
const { isAuthorized } = require("../../lib/jwt")
require("dotenv").config()

module.exports = async (req, res) => {
	try {
		const userToken = isAuthorized(req)
		const { id } = userToken
		const { title, content } = req.body
		const user_id = id

		if (!title || !content) {
			return res.status(401).json({ message: "bad-request" })
		}
		if (title.length > 30) {
			return res.status(401).json({ title, message: "title-is-too-long" })
		}

		await db.addGallery({ user_id, title, content })
		return res.status(201).json({ user_id, title, message: "gallery-created-successfully" })
	} catch (err) {
		res.status(500).json({ message: "server-error" })
	}
}
