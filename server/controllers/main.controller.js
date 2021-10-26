const { Singlepost, Gallerypost } = require("../models")

module.exports = {
	get: async (req, res) => {
		let single = await Singlepost.findAll({
			where: { genre: req.params.genre },
		})
		console.log(single)
		if (!single) {
			res.status(404).json({ message: "data-not-found" })
		} else {
			single = single.map((data) => {
				return data.dataValues
			})
			res.status(200).json({ single: single, message: "ok" })
		}
	},
}
