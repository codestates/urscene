const { getverify } = require("../../db")
const { Like } = require("../../models")

module.exports = async (req, res) => {
	const userinfo = isAuthorized(req)
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
}
