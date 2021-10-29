const { Singlepost, Singlepost_gallerypost, Gallerypost, sequelize } = require("../../models")

module.exports = async (req, res) => {
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
	res.status(200).json({ Ranking_gallery: array })
}
