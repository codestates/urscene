const { Singlepost } = require("../../models")
const { isAuthorized } = require("../../lib/jwt")

module.exports = async (req, res) => {
	const userinfo = isAuthorized(req)

	const singleId = await Singlepost.findOne({
		where: { id: req.params.singlepostid, user_id: userinfo.id },
	}) //commentid로 찾은 comment의 userid와 비교하려고찾았지

	if (singleId) {
		await Singlepost.destroy({
			where: { id: req.params.singlepostid },
		})
		res.status(200).json({ message: "delete-successfully" })
	} else {
		res.status(400).json({ message: "data-not-found" })
	}
}
