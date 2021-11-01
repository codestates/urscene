const { Gallerypost } = require("../../models")
const { isAuthorized } = require("../../lib/jwt")

module.exports = async (req, res) => {
	const userinfo = isAuthorized(req)
	const { galleryid } = req.params

	const gallery = await Gallerypost.destroy({
		where: { id: galleryid, user_id: userinfo.id },
	})

	if (!gallery) {
		res.status(404).json({ message: "data-not-found" })
	} else {
		res.status(200).json({ message: "delete-gallery-successfully" })
	}
}
