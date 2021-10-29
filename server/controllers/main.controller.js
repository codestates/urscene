const { Singlepost, Singlepost_gallerypost, Like, User, Gallerypost, sequelize } = require("../models")
const { Op } = require("sequelize")

module.exports = {
	genre: async (req, res) => {
		const { genre, page, limit } = req.query
		// console.log(genre, page, limit)
		let offset = 0

		if (page > 1) {
			offset = 1 * (page - 1)
		}

		let single = await Singlepost.findAll({
			order: [["createdAt", "DESC"]],
			where: { genre: genre },
			offset: offset,
			limit: Number(limit),
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
		// const data = await Singlepost_gallerypost.findOne({
		// 	include: [],
		// 	where: { Gallerypost_id: 1 },
		// })
		// console.log(data)

		const data = await sequelize.query(
			"SELECT Galleryposts.id, count(Likes.id) AS count FROM Galleryposts INNER JOIN Likes ON Galleryposts.id = Likes.gallerypost_id Group by Galleryposts.id ORDER BY count desc LIMIT 9"
		)
		const likelist = data[0]
		// console.log(likelist)
		let array = []
		let image = []
		for (const element of likelist) {
			const singleimage = await Singlepost_gallerypost.findAll({
				include: [
					{
						model: Singlepost,
						attributes: ["image"],
					},
				],
				where: { Gallerypost_id: element.id },
			})
			const data = singleimage.map((el) => el.dataValues.Singlepost.dataValues)
			image.push(data)
		}
		// console.log(image)

		for (const element of likelist) {
			const gallery = await Singlepost_gallerypost.findOne({
				include: [
					{
						model: Gallerypost,
						attributes: ["id", "title", "content"],
					},
				],
				where: { Gallerypost_id: element.id },
			})
			const data = gallery.dataValues.Gallerypost.dataValues
			array.push(data)
		}
		// console.log(array)

		array.map((el, index) => {
			el.image = image[index]
		})

		// gallery의 요소하나에 image의 요소하나를 넣는다

		// for (const el of likelist) {
		// 	const data = await Gallerypost.findOne({
		// 		include: [
		// 			{
		// 				model: User,
		// 				attributes: ["nickname"],
		// 			},
		// 		],
		// 		where: { id: el.id },
		// 	})
		// 	delete data.dataValues.user_id
		// 	array.push(data.dataValues)
		// }
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
