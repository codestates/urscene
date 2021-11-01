const db = require("../../db")
require("dotenv").config()

module.exports = async (req, res) => {
	try {
	} catch (err) {
		res.status(500).json({ message: "server-error" })
	}
}
