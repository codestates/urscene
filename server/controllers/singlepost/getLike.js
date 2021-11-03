const db = require("../../db")

module.exports = async (req, res) => {
	const { singlepostid } = req.params
	const userinfo = isAuthorized(req)
	const id = userinfo.id
	const check = await db.getSingleLike({ id, singlepostid })

	if (!check) {
		res.status(404).json({ Like: null })
	} else {
		const data = check.dataValues.id
		res.status(200).json({ Like: data })
	}
}
