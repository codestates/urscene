const { Singlepost, Like, User, Gallerypost, sequelize } = require("../models")
const { Op } = require("sequelize")

module.exports = {
	genre: async (req, res) => {
		let single = await Singlepost.findAll({
			order: [["createdAt", "DESC"]],
			where: { genre: req.params.genre },
		})
		// console.log(single)
		if (!single) {
			res.status(404).json({ message: "data-not-found" })
		} else {
			single = single.map((data) => {
				delete data.dataValues.user_id
				return data.dataValues
			})
			res.status(200).json({ single: single })
		}
	},

	rank: async (req, res) => {
		const data = await sequelize.query(
			"SELECT Galleryposts.id, count(Likes.id) AS count FROM Galleryposts INNER JOIN Likes ON Galleryposts.id = Likes.gallerypost_id Group by Galleryposts.id ORDER BY count desc LIMIT 9"
		)
		const likelist = data[0]
		// console.log(likelist)
		let array = []
		for (const el of likelist) {
			const data = await Gallerypost.findOne({
				where: { id: el.id },
			})
			delete data.dataValues.user_id
			array.push(data.dataValues)
		}
		// console.log(array)
		// const map = await likelist.forEach(async (el) => {
		// 	const data = await Gallerypost.findOne({
		// 		where: { id: el.id },
		// 	})
		// 	return data.dataValues
		// }) 맵을 쓰면 안된다.
		res.status(200).json({ Ranking_gallery: array })
	},
}
