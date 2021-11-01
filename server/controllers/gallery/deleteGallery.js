const { Gallerypost } = require("../../models")
const { gerverify } = require("../../db")
const e = require("express")

module.exports = async (req, res) => {
	const userinfo = getverify(req.cookies.jwt)
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
