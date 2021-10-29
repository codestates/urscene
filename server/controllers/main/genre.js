const { Singlepost } = require("../../models")

module.exports = async (req, res) => {
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
}
