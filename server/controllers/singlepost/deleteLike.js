const {isAuthorized} = require("../../lib/jwt");
const db = require("../../db");

module.exports = async (req, res) => {
  const userinfo = isAuthorized(req);
  if (!userinfo) {
    return res.status(400).json({message: "not-authorized"});
  }
  const {singlelikeid} = req.params;
  const userid = userinfo.id;

	const data = await db.getLike({ userid, singlelikeid })
	if (!data) {
		res.status(404).json({ message: "data-not-found" })
	} else {
		const { id, singlepost_id } = data

		await db.deleteSingleLike({ id, singlepost_id })
		res.status(200).json({ message: "delete-singlelike-successfully" })
	}
}

