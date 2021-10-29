const db = require("../../db")
require("dotenv").config()

module.exports = {
	checkTakenNm: async (req, res) => {
		try {
			const { nickname } = req.body
			const takenNm = await db.getUserByName(nickname)
			if (takenNm) {
				return res.status(409).json({ nickname, message: "name-already-exists" })
			}
			return res.status(200).json({ message: "available-name" })
		} catch (err) {
			res.status(500).json({ data: err, message: "sever-error" })
		}
	},
}
