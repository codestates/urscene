const { isAuthorized } = require("../../lib/jwt");
const { Like } = require("../../models");

module.exports = async (req, res) => {
	const userinfo = isAuthorized(req);
	if (!userinfo) {
		return res.status(400).json({ message: "not-authorized" });
	}
	const { singlelikeid } = req.params;
	const userid = userinfo.id;

	const data = await Like.findOne({
		where: {
			id: singlelikeid,
			user_id: userid, //userinfo.id
		},
	});
	if (!data) {
		res.status(404).json({ message: "data-not-found" });
	} else {
		const { id, singlepost_id } = data;
		await Like.destroy({
			where: {
				id: id,
				singlepost_id: singlepost_id,
			},
		});
		res.status(200).json({ message: "delete-singlelike-successfully" });
	}
};
