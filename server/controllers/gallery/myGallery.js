const { Gallerypost } = require("../../models")

module.exports = async (req, res) => {
	const userinfo = getverify(req.cookies.token)
	const my = await Gallerypost.findAll({
		where: { user_id: userinfo },
	})
	if (!my) {
		res.status(404).json({ message: "data-not-found" })
	} else {
		const list = my.map((el) => el.dataValues)
		list.map((el) => delete el.user_id)
		res.status(200).json({ my: list })
	}
}
