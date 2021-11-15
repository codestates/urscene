const { isAuthorized } = require("../../lib/jwt");
const { Description, Singlepost } = require("../../models");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
	const userinfo = isAuthorized(req);
	if (!req.body.title || !req.body.image || !req.body.content || !req.body.genre) {
		res.status(400).json({ message: "bad request" }); //하나라도 없으면 400
	} else {
		const { id, title, image, content, genre } = req.body;
		const data = await Description.findOne({
			where: { id: id, [Op.or]: [{ title }, { title_eng: title }] },
		});

		const descriptionsId = data.dataValues.id;
		const userId = userinfo.id;
		const singlepost = await Singlepost.create({
			user_id: userId,
			title,
			image,
			content,
			genre,
			description_id: descriptionsId,
		});

		delete singlepost.dataValues.user_id;
		console.log(singlepost.dataValues);
		res.status(201).json({ data: singlepost.dataValues, message: "ok" });
	}
};
