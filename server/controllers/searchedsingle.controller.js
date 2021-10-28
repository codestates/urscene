const { Singlepost } = require("../models")
const { Op } = require("sequelize")

module.exports = {
	get: async (req, res) => {
		const { content, page } = req.query
		// console.log(page)
		let offset = 0

		if (page > 1) {
			offset = 1 * (page - 1)
		}
		const data = await Singlepost.findAll({
			where: {
				[Op.or]: [{ title: { [Op.substring]: content } }, { content: { [Op.substring]: content } }],
			},
			offset: offset,
			limit: 2,
		})
		const dataValues = data.map((el) => el.dataValues)
		let array = []
		for (const data of dataValues) {
			delete data.user_id
			array.push(data)
		}
		if (array.length === 0) {
			res.status(404).json({ message: "data-not-found" })
		} else {
			res.status(200).json({ search_single: array })
		}
		// console.log(array)
	},
}
