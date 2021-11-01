const { Singlepost_gallerypost, Singlepost } = require("../../models")

module.exports = async (req, res) => {
	const { galleryid, singlepostid } = req.params
	const data = await Singlepost_gallerypost.findOne({
		include: [
			{
				model: Singlepost,
				attributes: ["title"],
			},
		],
		where: { singlepost_id: singlepostid, gallerypost_id: galleryid },
	})
	if (!data) {
		res.status(404).json({ message: "data-not-found", singlepostid: singlepostid })
	} else {
		const singletitle = data.dataValues.Singlepost.dataValues.title
		await Singlepost_gallerypost.destroy({
			where: { id: data.dataValues.id },
		})
		res.status(200).json({ message: "delete-successfully", singletitle })
	}
}

// 쓰레기통 누르면 조인테이블의 singlepost_id가 필요하지?
// singlepost_id이게 포함된 조인테이블의 id를 날려버리고…
// singlepost_id가 있어? 어디에 갤러리상세페이지를 요청할때 id가 전달된다.
// 그럼ok?
// 의문점 : 유저검증 안해도되냐?아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ생각해보자ㅏㅏㅏㅏㅏㅏㅏㅏ
// 이미 상세페이지들어올때 유저검증이 됐기 때문에? 일단 빼고...
