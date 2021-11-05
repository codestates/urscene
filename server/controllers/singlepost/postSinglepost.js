const { isAuthorized } = require("../../lib/jwt")
const db = require("../../db")

module.exports = async (req, res) => {
	const userinfo = isAuthorized(req)
	if (!req.body.title || !req.body.image || !req.body.content || !req.body.genre) {
		res.status(400).json({ message: "bad request" }) //하나라도 없으면 400
	} else {
		const { title, image, content, genre } = req.body
		const data = await db.getDescriptionsByTitle(title)
		// console.log(data)
		const { id } = userinfo
		const descriptionsId = data.dataValues.id

		const singlepost = await db.addsinglepost({ id, title, image, content, genre, descriptionsId })
		delete singlepost.dataValues.user_id
		console.log(singlepost.dataValues)
		res.status(201).json({ data: singlepost.dataValues, message: "ok" })
	}
}
