const { Gallerypost } = require("../../models")
const { getverify } = require("../../db")

module.exports = async (req, res) => {
	const { galleryid } = req.params
	const { title, content } = req.body
	// const userinfo = getverify(req.cookies.jwt)

	const gallery = await Gallerypost.findOne({
		where: { id: galleryid, user_id: 3 }, //userinfo.id
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
