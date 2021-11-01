const { Gallerypost, User, Singlepost_gallerypost, Singlepost } = require("../../models")

module.exports = async (req, res) => {
	const { galleryid } = req.params
	const gallerydata = await Gallerypost.findOne({
		include: [
			{
				model: User,
				attributes: ["nickname", "image"],
			},
		],
		where: { id: galleryid },
	})
	const userinfo = gallerydata.dataValues.User

	const list = await Singlepost_gallerypost.findAll({
		include: [
			{
				model: Singlepost,
			},
		],
		where: { gallerypost_id: galleryid },
	})
	if (!list) {
		res.status(404).json({ message: "data-not-found" })
	} else {
		const data = list.map((el) => el.dataValues)
		let result = []
		for (const el of data) {
			delete el.Singlepost.dataValues.user_id
			result.push(el)
		}
		res.json({ user: userinfo, result })
	}
}

// User > nickname, user_image
// Gallerypost > id title content
// Singlepost > 모든정보
//404 	"message": "data-not-found"
// 갤러리상세 페이지에 아무것도없을때는? okok
