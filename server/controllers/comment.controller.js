const { getverify } = require("../db")
const { Comment, User } = require("../models")

module.exports = {
	post: (req, res) => {
		const userinfo = getverify(req.cookies.jwt)
		// userinfo id,nickname,email,image user_nickname, user_iamge
		const { nickname, image, id } = userinfo // 유저정보에서 nickname image id만
		const { singlepostid, comment } = req.body
		if (!singlepostid || !comment) {
			res.status(401).json({ message: "request-error" })
		} else {
			const data = Comment.create({
				user_id: id,
				comment: comment,
				singlepost_id: singlepostid,
			})
			// delete data.dataValues.user_id data정보 확인후 결정
			res.status(201).json({ data: data, user_nickname: nickname, user_image: image })
		}
	},

	get: async (req, res) => {
		//singlepostid 를 입력해 해당하는 코멘트를 전부 불러오고 유저의 닉네임,이미지 까지 가져온다.
		const { singlepostid } = req.params
		const data = await Comment.findAll({
			include: [
				{
					model: User,
					attributes: ["nickname", "image"],
				},
			],
			where: { singlepost_id: singlepostid },
		})
		if (!data) {
			res.status(404).json({ message: "data-not-found" })
		} else {
			data.map((el) => {
				delete el.dataValues.user_id
				delete el.dataValues.gallerypost_id
			})
			res.status(200).json({ data: data })
		}
	},

	delete: async (req, res) => {
		const userinfo = getverify(req.cookies.jwt)
		const usercomment = await Comment.findOne({
			where: { user_id: userinfo.id },
		}) //comment 테이블에서 user_id와 유저정보의 id가 일치하는 데이터만 뽑는다

		const commentId = await Comment.findOne({
			where: { id: req.params.commentid },
		}) //commentid로 찾은 comment의 userid와 비교하려고찾았지

		if (usercomment.dataValues.id === commentId.dataValues.user_id) {
			await Comment.destroy({
				where: { id: req.params.commentid },
			})
			res.status(200).json({ message: "delete-comment-successfully" })
		} else {
			res.status(404).json({ message: "data-not-found" })
		}
	},
}
