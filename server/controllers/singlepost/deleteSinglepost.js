const { Singlepost } = require("../../models")

module.exports = async (req, res) => {
	const userinfo = getverify(req.cookies.jwt)
	const usersingle = await Singlepost.findOne({
		where: { user_id: userinfo.id },
	})

	const singleId = await Singlepost.findOne({
		where: { id: req.params.singlepostid },
	}) //commentid로 찾은 comment의 userid와 비교하려고찾았지

	if (usersingle.dataValues.id === singleId.dataValues.user_id) {
		const data = await Singlepost.destroy({
			where: { id: req.params.singlepostid },
		})
		res.status(200).json({ message: "delete-successfully" })
	} else {
		res.status(400).json({ message: "data-not-found" })
	}
}
