const { isAuthorized } = require("../../lib/jwt")
const { Like } = require("../../models")

module.exports = async (req, res) => {
	const userinfo = isAuthorized(req)
	const { singlelikeid } = req.params
	const data = await Like.findOne({
		where: {
			user_id: userinfo.id, //userinfo.id
			id: singlelikeid,
		},
	})
	Like.destroy({
		where: {
			id: data.dataValues.id,
			singlepost_id: data.dataValues.singlepost_id,
		},
	})
	res.status(200).json({ message: "delete-singlelike-successfully" })
}
