const { getverify } = require("../../db")
const { Like } = require("../../models")

module.exports = async (req, res) => {
	const userinfo = getverify(req.cookies.token)
	const { galleryid } = req.params
	console.log(galleryid)
	if (galleryid) {
		const over = await Like.findOne({
			where: { user_id: userinfo.id, gallerypost_id: galleryid }, //userinfo.id
		})
		if (!over) {
			const Likedata = await Like.create({
				user_id: userinfo.id, //userinfo.id
				gallerypost_id: galleryid,
			})
			delete Likedata.dataValues.user_id
			res.status(201).json({ Likedata })
		} else {
			res.status(403).json({ message: "중복" })
		}
	}
}
