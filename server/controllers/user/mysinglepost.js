const { isAuthorized } = require("../../lib/jwt");
const { Singlepost } = require("../../models");

module.exports = async (req, res) => {
	const userinfo = isAuthorized(req);
	console.log("userinfo===", userinfo);
	const id = userinfo.id;
	const my = await Singlepost.findAll({ where: { user_id: id } });
	if (!my) {
		res.status(404).json({ message: "data-not-found" });
	} else {
		const list = my.map((el) => el.dataValues);
		list.map((el) => delete el.user_id);
		res.status(200).json({ my: list });
	}
};
