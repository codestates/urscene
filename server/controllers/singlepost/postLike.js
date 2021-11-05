const {isAuthorized} = require("../../lib/jwt");
const db = require("../../db");

module.exports = async (req, res) => {
	const userinfo = isAuthorized(req)
	const id = userinfo.id
	const { singlepostid } = req.params

	const over = await db.getSinglepostLike({ id, singlepostid })
	const check = over[0]
	console.log(check.dataValues)

  delete check.dataValues.user_id;
  res.status(201).json({check});
};
