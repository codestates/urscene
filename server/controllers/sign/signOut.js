require("dotenv").config()

module.exports = async (req, res) => {
	try {
		res.clearCookie("token")
		res.clearCookie("uuid").status(205).json({ message: "signed-out-successfully" })
	} catch (err) {
		res.status(500).json({ message: "server-error" })
	}
}
