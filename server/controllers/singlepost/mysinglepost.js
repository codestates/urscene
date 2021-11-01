const { Singlepost, User } = require("../../models")

module.exports = async (req, res) => {
	const userinfo = getverify(req.cookies.jwt)
	const my = await Singlepost.findAll({
		user_id: userinfo.id,
	})
	if (!my) {
		res.status(404).json({ message: "data-not-found" })
	} else {
		const list = my.map((el) => el.dataValues)
		list.map((el) => delete el.user_id)
		res.status(200).json({ my: list })
	}
}
