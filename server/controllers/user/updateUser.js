const db = require("../../db")
const bcrypt = require("bcrypt")
const { isAuthorized } = require("../../lib/jwt")
const { passwordRegex } = require("../../lib/regex")

module.exports = async (req, res) => {
	try {
		const userToken = isAuthorized(req)
		const { id } = userToken
		const { newName, newPassword, newImage } = req.body
		const user = await db.getUserById(id)
		const { nickname } = user.dataValues
		const validPassword = passwordRegex(newPassword)

		if (!validPassword) {
			return res.status(400).json({ newPassword, message: "invalid-new-password" })
		}
		if (newPassword === password) {
			return res.status(409).json({ newPassword, message: "recently-used-name" })
		}
		if (newName === nickname) {
			return res.status(409).json({ newName, message: "recently-used-name" })
		}
		const existentName = await db.getUserByName(newName)
		if (existentName) {
			return res.status(409).send({ newName, message: "name-already-exists" })
		}
		const salt = await bcrypt.genSalt(10)
		const hashPassword = await bcrypt.hash(newPassword, salt)
		await db.updateUser({ id, newName, hashPassword, newImage })
		return res.status(200).json({ newName, newImage, message: "update-successfully" })
	} catch (err) {
		res.status(500).json({ message: "server-error" })
	}
}
