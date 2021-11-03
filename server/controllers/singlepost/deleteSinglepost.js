const { isAuthorized } = require("../../lib/jwt")
const db = require("../../db")

module.exports = async (req, res) => {
	const userinfo = isAuthorized(req)
	if (!userinfo) {
		return res.status(400).json({ message: "not-authorized" })
	}
	const id = userinfo.id
	const { singlepostid } = req.params
	const singleId = await db.getDeleteSinglepost({ singlepostid, id })
	//commentid로 찾은 comment의 userid와 비교하려고찾았지

	if (singleId) {
		await db.deleteSinglepost(singlepostid)
		res.status(200).json({ message: "delete-successfully" })
	} else {
		res.status(400).json({ message: "data-not-found" })
	}
}
