const db = require("../../db");
const { isAuthorized } = require("../../lib/jwt");

module.exports = async (req, res) => {
	try {
		const userToken = isAuthorized(req);
		const { id } = userToken;
		const likedSinglepost = await db.getLikedSinglepostById(id);
		const singlepost_id = likedSinglepost.map((el) => el.singlepost_id);
		const likedSinglepostData = [];
		for (const id of singlepost_id) {
			const data = await db.getSinglePostById(id);
			likedSinglepostData.push(data);
		}
		return res.status(200).json({ likedSinglepostData });
	} catch (err) {
		res.status(500).json({ message: "server-error" });
	}
};
