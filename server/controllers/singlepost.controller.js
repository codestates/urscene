const { Singlepost, Description, User } = require("../models")
const jwt = require("jsonwebtoken")

module.exports = {
	post: async (req, res) => {
		const token = req.cookies.jwt
		const verify = jwt.verify(token, process.env.ACCESS_SECRET)
		const userinfo = User.findOne({
			where: { id: verify.id },
		})
		if (!req.body.title || !req.body.image || !req.body.content || !req.body.genre) {
			res.status(400).json({ message: "bad request" }) //하나라도 없으면 400
		} else {
			const singlepost = await Singlepost.create({
				user_id: userinfo.dataValues.id,
				title: req.body.title,
				image: req.body.image,
				content: req.body.content,
				genre: req.body.genre,
			})
			const { id, title, image, content, genre } = singlepost.dataValues
			res.status(201).json({ data: { id, title, image, content, genre } })
		}
	},

	movietitle: async (req, res) => {
		const movietitle = await Description.findOne({
			where: { title: req.query.movietitle },
		})
		const { id, title } = movietitle.dataValues
		if (!movietitle) {
			//해당하는 영화제목을 찾고 없으면 404
			res.status(404).json({ message: "data-not-found" })
		} else {
			res.status(200).json({ data: { id, title } })
		}
	},

	get: async (req, res) => {
		const token = req.cookies.jwt
		const verify = jwt.verify(token, process.env.ACCESS_SECRET)
		const userinfo = User.findOne({
			where: { id: verify.id },
		})
		const { singlepostid } = req.params
		let post = await Singlepost.findOne({
			include: [
				{
					model: User,
					attributes: ["nickname", "image"],
				},
			],
			where: { id: singlepostid },
		})

		if (!post) {
			//singlepostid 없으면 404
			res.status(404).json({ message: "data-not-found" })
		} else {
			delete post.dataValues.user_id
			res.status(200).json({ data: post.dataValues }) //id,genre,content,userid,iamge(장면)
		} //있으면 id포함 정보를 다 넘겨준다 {userid} 제외???
	},

	patch: async (req, res) => {
		const post = await Singlepost.findOne({
			where: { id: req.body.id },
		})
		// getUserById(req.body.id)
		// getUserById: async (id) =>
		// User.findOne({
		// 	where: { id: id },
		// })
		// singlepostid 있는지 확인하고 없으면 400 있으면 수정
		if (!post) {
			res.status(400).json({ message: "data-not-found" })
		} else {
			await Singlepost.update(
				{
					content: req.body.content,
				},
				{
					where: { id: post.dataValues.id },
				}
			)

			const { id, content } = post.dataValues
			res.status(200).json({ data: { id: id, content: content } })
		}
	},

	delete: async (req, res) => {
		//해당 id 찾아서 삭제
		const data = await Singlepost.destroy({
			where: { id: req.params.singlepostid },
		})
		if (!data) {
			res.status(400).json({ message: "data-not-found" })
		}
		res.status(200).json({ message: "delete-successfully" })
	},
}
