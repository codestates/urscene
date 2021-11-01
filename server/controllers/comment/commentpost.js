const { isAuthorized } = require("../../lib/jwt")
const { Comment } = require("../../models")

module.exports = (req, res) => {
	const userinfo = isAuthorized(req)
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
}
