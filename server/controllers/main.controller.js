const { Singlepost, Like, Gallerypost, sequelize } = require("../models")
const { Op } = require("sequelize")

module.exports = {
	genre: async (req, res) => {
		let single = await Singlepost.findAll({
			order: [["createdAt", "DESC"]],
			where: { genre: req.params.genre },
		})
		// console.log(single)
		if (!single) {
			res.status(404).json({ message: "data-not-found" })
		} else {
			single = single.map((data) => {
				delete data.dataValues.user_id
				return data.dataValues
			})

			res.status(200).json({ single: single })
		}
	},

	rank: async (req, res) => {
		const { count, row } = await Like.findAndCountAll({
			where: {
				gallerypost_id: {
					[Op.not]: null,
				},
			},
		})
		console.log(count)
		console.log(row)
		//null 값인걸 뺴놓고 테이블을 조인을 해놓고 id값으로 받아보자
		// const data = await Like.findAll({
		// 	where: {
		// 		gallerypost_id: {
		// 			[Op.not]: null,
		// 		},
		// 	},
		// 	order: [["gallerypost_id"]],
		// })
		// const gallery = data.map((el) => el.dataValues.gallerypost_id)
		// const fil = gallery.filter((element, index) => {
		// 	return gallery.indexOf(element) === index
		// })
		// // console.log(fil)
		// const filterd = fil.map(async (el) => {
		// 	const { count, rows } = await Like.findAndCountAll({
		// 		where: {
		// 			gallerypost_id: el,
		// 		},
		// 	})
		// 	// console.log(count)
		// })
		// console.log(filterd)
		// console.log(count)
		// console.log(rows.length)
		// 맵 돌려서 해당 갤러리id에 맞게 개수를 세서 어쩔꺼냐아ㅏㅏㅏㅏㅏㅏㅏ?
		// const data = await sequelize.query(
		// 	"SELECT DISTINCT(`gallerypost_id`) FROM `Likes` AS `Like` WHERE `Like`.`gallerypost_id` IS NOT NULL"
		// )
		// const num = data[0].map((el) => el.gallerypost_id)
		// console.log(num[0])
		// Like.findAll({
		// 	where: { gallerypost_id: num[0] },
		// }).then((data) => console.log(data.length))
		// console.log(result)
		// Like.findOne({})
		// const gallery = await Like.findAll({
		// 	attributes: [sequelize.fn("DISTINCT", sequelize.col("gallerypost_id"))],
		// 	where: {
		// 		gallerypost_id: {
		// 			[Op.not]: null,
		// 		},
		// 	},
		// })
		// console.log(gallery)
		// const {id} = gallery.map(async (el) => {
		// 	const data = await Like.findAndCountAll({
		// 		where: {
		// 			gallerypost_id: el.dataValues.gallerypost_id,
		// 		},
		// 	})
		// 	return data
		// })
		// console.log(id)
		//몇개씩 있나 다 찾아가지고 그 개수를 정렬한다음 다시 순서대로
		// let array = []
		// data.map((el) => el.dataValues.gallerypost_id).map((num) => array.push({num}))
		// console.log(array)
	},
}
