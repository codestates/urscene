const { Comment, User } = require("../../models");

module.exports = async (req, res) => {
	//singlepostid 를 입력해 해당하는 코멘트를 전부 불러오고 유저의 닉네임,이미지 까지 가져온다.
	const { singlepostid } = req.params;
	const data = await Comment.findAll({
		include: [
			{
				model: User,
				attributes: ["nickname", "image"],
			},
		],
		where: { singlepost_id: singlepostid },
	});
	if (!data) {
		res.status(404).json({ message: "data-not-found" });
	} else {
		data.map((el) => {
			delete el.dataValues.user_id;
			delete el.dataValues.gallerypost_id;
		});
		res.status(200).json({ data: data });
	}
};
