const { Gallerypost } = require("../../models")
const { isAuthorized } = require("../../lib/jwt")

module.exports = async (req, res) => {
	const userinfo = isAuthorized(req)
	const my = await Gallerypost.findAll({
		where: { user_id: userinfo.id },
	})
	if (!my) {
		res.status(404).json({ message: "data-not-found" })
	} else {
		const list = my.map((el) => el.dataValues)
		list.map((el) => delete el.user_id)
		res.status(200).json({ my: list })
	}
}
