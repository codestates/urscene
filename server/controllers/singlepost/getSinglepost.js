const db = require("../../db")

module.exports = async (req, res) => {
	const { singlepostid } = req.params

	let post = await db.getSinglepost(singlepostid)
	if (!post) {
		//singlepostid 없으면 404
		res.status(404).json({ message: "data-not-found" })
	} else {
		delete post.dataValues.user_id
		res.status(200).json({ data: post.dataValues })
	} // post.dataValues => id,user_id,title,genre,content,image(장면),description_id
	// 영화정보에는 title,genre,director,released 나의장면 상세페이지의 영화장르는 현재 앱에서 지원하는 장르와 다른컨셉.
	// 왜 다른컨셉?? 사용자의 취향존중 ok
}
