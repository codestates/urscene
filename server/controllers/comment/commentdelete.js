const { isAuthorized } = require("../../lib/jwt")
const { Comment } = require("../../models")

module.exports = async (req, res) => {
	const userinfo = isAuthorized(req)
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
}
