const { Singlepost, Description } = require("../../models")
const { Op } = require("sequelize")

module.exports = async (req, res) => {
	const userinfo = getverify(req.cookies.jwt)
	if (!req.body.title || !req.body.image || !req.body.content || !req.body.genre) {
		res.status(400).json({ message: "bad request" }) //하나라도 없으면 400
	} else {
		const data = await Description.findOne({
			where: {
				[Op.or]: [{ title: req.body.title }, { title_eng: req.body.title }],
			},
		})
		const singlepost = await Singlepost.create({
			user_id: 1,
			title: req.body.title,
			image: req.body.image,
			content: req.body.content,
			genre: req.body.genre,
			description_id: data.id,
		})
		const { id, title, image, content, genre } = singlepost.dataValues
		res.status(201).json({ data: { id, title, image, content, genre }, message: "ok" })
	}
}
