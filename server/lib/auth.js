const { isAuthorized, decrypt } = require("./jwt");

module.exports = {
	isAuthorizedUser: async (req, res, next) => {
		const cookieUUID = req.cookies.uuid;
		const userToken = isAuthorized(req);
		console.log(userToken);
		const { uuid } = userToken;
		const decryptedUUID = await decrypt(uuid, process.env.ENCRYPTION_KEY);

		if (decryptedUUID !== cookieUUID) {
			return res.status(400).json({ message: "invalid-token" });
		}
		return next();
	},
};
