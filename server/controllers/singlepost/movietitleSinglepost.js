const { Description } = require("../../models")

module.exports = async (req, res) => {
	const movietitle = await Description.findOne({
		where: { title: req.query.movietitle },
	})
	const { id, title } = movietitle.dataValues
	if (!movietitle) {
		//해당하는 영화제목을 찾고 없으면 404
		res.status(404).json({ message: "data-not-found" })
	} else {
		res.status(200).json({ data: { id, title } })
	}
}
