const db = require("../../db")
require("dotenv").config()

module.exports = async (req, res) => {
	try {
		const { title, content } = req.body
		if (!title || !content) {
			return res.status(401).json({ message: "bad-request" })
		}

		if (title.length > 30) {
			return res.status(401).json({ title, message: "title-is-too-long" })
		}
		await db.addGallery({ title, content })
		res.status(201).json({ title, message: "gallery-created-successfully" })
	} catch (err) {
		res.status(500).json({ message: "server-error" })
	}
}
