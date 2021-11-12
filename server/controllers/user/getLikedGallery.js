const db = require("../../db")
const { isAuthorized } = require("../../lib/jwt")

module.exports = async (req, res) => {
	try {
		const userToken = isAuthorized(req)
		const { id } = userToken
		const likedGallery = await db.getLikedGalleryById(id)
		const gallerypost_id = likedGallery.map((el) => el.gallerypost_id)
		const likedGalleryData = []
		for (const id of gallerypost_id) {
			const data = await db.getGalleryById(id)
			likedGalleryData.push(data)
		}
		return res.status(200).json({ likedGalleryData })
	} catch (err) {
		res.status(500).json({ message: "server-error" })
	}
}
