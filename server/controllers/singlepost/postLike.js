const { isAuthorized } = require("../../lib/jwt")
const { Like } = require("../../models")

module.exports = async (req, res) => {
	const userinfo = isAuthorized(req)
	const id = userinfo.id
	const { singlepostid } = req.params

	const over = await Like.findOrCreate({
		where: { user_id: id, singlepost_id: singlepostid }, //userinfo.id
	})
	const check = over[0]
	console.log(check.dataValues)

	delete check.dataValues.user_id
	res.status(201).json({ check })
}
