const { Singlepost } = require("../../models")

module.exports = async (req, res) => {
	const { singlepostid } = req.params
	const post = await Singlepost.findOne({
		where: { id: singlepostid },
	})
	// getUserById(req.body.id)
	// getUserById: async (id) =>
	// User.findOne({
	// 	where: { id: id },
	// })
	// singlepostid 있는지 확인하고 없으면 400 있으면 수정
	if (!post) {
		res.status(400).json({ message: "data-not-found" })
	} else {
		await Singlepost.update(
			{
				content: req.body.content,
			},
			{
				where: { id: post.dataValues.id },
			}
		)

		const { id, content } = post.dataValues
		res.status(200).json({ data: { id: id, content: content } })
	}
}
