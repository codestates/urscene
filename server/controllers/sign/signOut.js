const db = require("../../db");
const { decrypt, isAuthorized } = require("../../lib/jwt");
require("dotenv").config();

module.exports = async (req, res) => {
  try {
    const userToken = isAuthorized(req);
    if (!userToken) {
      return res.status(400).json({ message: "not-authorized" });
    }

    const { uuid } = userToken;
    const decryptedUUID = await decrypt(uuid, process.env.ENCRYPTION_KEY);
    const cookieUUID = req.cookies.uuid;

		if (decryptedUUID === cookieUUID) {
			res.clearCookie("token")
			res.clearCookie("uuid").status(205).json({ message: "signed-out-successfully" })
		}
	} catch (err) {
		res.status(500).json({ message: "server-error" })
	}
}
