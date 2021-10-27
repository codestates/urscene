const { Like } = require("../models")
module.exports = {
	singlepost: async (req, res) => {
		const userinfo = getverify(req.cookies.jwt)
		const { singlepostid } = req.params
		console.log(singlepostid)
		if (singlepostid) {
			const over = await Like.findOne({
				where: { user_id: userinfo.id, singlepost_id: singlepostid }, //userinfo.id
			})
			if (!over) {
				const Likedata = await Like.create({
					user_id: userinfo.id, //userinfo.id
					singlepost_id: singlepostid,
				})
				delete Likedata.dataValues.user_id
				res.status(201).json({ Likedata })
			} else {
				res.status(403).json({ message: "중복" }) //403?불필요?
			}
		}
	},
	gallerypost: async (req, res) => {
		const userinfo = getverify(req.cookies.jwt)
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
	},

	singlelike: async (req, res) => {
		const userinfo = getverify(req.cookies.jwt)
		const { singlelikeid } = req.params
		const data = await Like.findOne({
			where: {
				user_id: userinfo.id, //userinfo.id
				id: singlelikeid,
			},
		})
		Like.destroy({
			where: {
				id: data.dataValues.id,
				singlepost_id: data.dataValues.singlepost_id,
			},
		})
		res.status(200).json({ message: "delete-singlelike-successfully" })
	},
	gallerylike: async (req, res) => {
		const userinfo = getverify(req.cookies.jwt)
		const { gallerylikeid } = req.params
		const data = await Like.findOne({
			where: {
				user_id: userinfo.id, //userinfo.id
				id: gallerylikeid,
			},
		})

		Like.destroy({
			where: {
				id: data.dataValues.id,
				gallerypost_id: data.dataValues.gallerypost_id,
			},
		})
		res.status(200).json({ message: "delete-gallerylike-successfully" })
	},
}
