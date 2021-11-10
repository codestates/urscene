const { isAuthorized } = require("../../lib/jwt")
const { Singlepost } = require("../../models")

module.exports = async (req, res) => {
	const userinfo = isAuthorized(req)
	const id = userinfo.id
	const { singlepostid } = req.params
	const singleId = await Singlepost.findOne({
		where: { id: singlepostid, user_id: id },
	})

	if (singleId) {
		await Singlepost.destroy({
			where: { id: singlepostid },
		})
		res.status(200).json({ message: "delete-successfully" })
	} else {
		res.status(400).json({ message: "data-not-found" })
	}
}
