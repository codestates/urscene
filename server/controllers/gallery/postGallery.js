const db = require("../../db");
const { decrypt, isAuthorized } = require("../../lib/jwt");
require("dotenv").config();

module.exports = async (req, res) => {
  try {
    const cookieUUID = req.cookies.uuid;
    const userToken = isAuthorized(req);
    if (!userToken) {
      return res.status(400).json({ message: "not-authorized" });
    }

    const { id, uuid } = userToken;
    const decryptedUUID = await decrypt(uuid, process.env.ENCRYPTION_KEY);

    if (cookieUUID === decryptedUUID) {
      const { title, content } = req.body;
      const user_id = id;
      if (!title || !content) {
        return res.status(401).json({ message: "bad-request" });
      }

			if (title.length > 30) {
				return res.status(401).json({ title, message: "title-is-too-long" })
			}
			await db.addGallery({ user_id, title, content })
			return res.status(201).json({ user_id, title, message: "gallery-created-successfully" })
		}
		return res.status(400).json({ message: "invalid-token" })
	} catch (err) {
		res.status(500).json({ message: "server-error" })
	}
}
