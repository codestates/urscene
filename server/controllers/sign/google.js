"use strict"
require("dotenv").config()

const jwt = require("jsonwebtoken")
const axios = require("axios")
const db = require("../../db")
const { encrypt, uuid, sendToken, sendUUID } = require("../../lib/jwt")

module.exports = async (req, res) => {
	const code = req.body.authorizationCode
	const url = `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&grant_type=${process.env.GOOGLE_GRANT_TYPE}`

	const access_token = await axios
		.post(url, {
			headers: { "content-type": "application/x-www-form-urlencoded" },
		})
		.then((el) => {
			return el.data.access_token
		})
		.catch((err) => {
			console.log("err=", err)
		})

	const googleAPI = `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`
	const userInfo = await axios
		.get(googleAPI, {
			headers: {
				authorization: `Bearer ${access_token}`,
			},
		})
		.then((el) => {
			return el.data
		})
		.catch((err) => {
			console.log("err=", err)
		})

	const email = userInfo.email
	const [result, created] = await db.addGoogleUser(email)
	if (!created) {
		return res.status(400).json({ message: "user-already-exists" })
	}

	const user = result.dataValues
	const { id } = user
	const sortedUUID = uuid()
	const encryptedUUID = await encrypt(sortedUUID, process.env.ENCRYPTION_KEY)
	const token = jwt.sign({ id: id, uuid: encryptedUUID }, process.env.JWT_SECRET, {
		expiresIn: "1d",
		issuer: "urscene",
	})

	sendToken(res, token)
	sendUUID(res, sortedUUID)
	return res.status(201).json({ user, message: "user-created-successfully" })
}
