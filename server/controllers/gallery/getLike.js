const { Like } = require("../../models")
const { isAuthorized } = require("../../lib/jwt")

module.exports = async (req, res) => {
	const { galleryid } = req.params
	const userinfo = isAuthorized(req)
	const check = await Like.findOne({
		where: { user_id: userinfo.id, gallerypost_id: galleryid },
	})
	if (!check) {
		res.status(404).json({ Like: null })
	} else {
		const data = check.dataValues.id
		res.status(200).json({ Like: data })
	}
}
