const { Gallerypost } = require("../../models")
const { isAuthorized } = require("../../lib/jwt")

module.exports = async (req, res) => {
	const { galleryid } = req.params
	const { title, content } = req.body
	const userinfo = isAuthorized(req)

	const gallery = await Gallerypost.findOne({
		where: { id: galleryid, user_id: userinfo.id }, //userinfo.id
	})
	console.log(gallery.dataValues)
	if (!gallery) {
		res.status(404).json({ message: "data-not-found" })
	} else {
		await Gallerypost.update(
			{
				title: title,
				content: content,
			},
			{ where: { id: gallery.dataValues.id } }
		)
		delete gallery.dataValues.user_id
		res.status(200).json({ gallery })
	}
}
