const { Singlepost } = require("../../models")
const { isAuthorized } = require("../../lib/jwt")

module.exports = async (req, res) => {
	const userinfo = isAuthorized(req)
	if (!userinfo) {
		return res.status(400).json({ message: "not-authorized" })
	}
	const { singlepostid } = req.params
	const { content } = req.body
	const post = await Singlepost.findOne({ where: { id: singlepostid } })
	if (!post) {
		res.status(400).json({ message: "data-not-found" })
	} else {
		const singleid = post.dataValues.id
		await Singlepost.update(
			{
				content: content,
			},
			{
				where: { id: singleid },
			}
		)
		res.status(200).json({ data: { id: post.dataValues.id, content: post.dataValues.content } })
	}
}
