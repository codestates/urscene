const db = require("../../db")
require("dotenv").config()

module.exports = {
	signOut: async (req, res) => {
		try {
		} catch (err) {
			return res.status(500).json({ message: "sever-error" })
		}
	},
}
