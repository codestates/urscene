"use strict"
require("dotenv").config()

const jwt = require("jsonwebtoken")
const axios = require("axios")
const db = require("../../db")
const { encrypt, uuid, sendToken, sendUUID } = require("../../lib/jwt")

module.exports = async (req, res) => {
	const code = req.body.authorizationCode
	const url = `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=https://urscene.de/login&grant_type=${process.env.GOOGLE_GRANT_TYPE}`

	const tokenData = await axios
		.post(url, {
			headers: { "content-type": "application/x-www-form-urlencoded" },
		})
		.catch((err) => {
			console.log(err)
		})
	console.log("tokenData-----------------------------------", tokenData)
	const access_token = tokenData.data.access_token
	const googleAPI = `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`
	const googleUser = await axios
		.get(googleAPI, {
			headers: {
				authorization: `Bearer ${access_token}`,
			},
		})
		.catch((err) => {
			console.log(err)
		})

	console.log("googleUser===============================", googleUser)
	const userInfo = googleUser.data
	const email = userInfo.email
	const [result, created] = await db.addGoogleUser(email)
	console.log("result====================", result)
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
