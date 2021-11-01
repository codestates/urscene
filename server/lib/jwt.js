const jwt = require("jsonwebtoken")
const CryptoJS = require("crypto-js")
const uuid4 = require("uuid4")
require("dotenv").config()

module.exports = {
	sendToken: (res, token) => {
		res.cookie("token", token, {
			httpOnly: true,
			sameSite: "None",
			secure: true,
			maxAge: 60 * 60 * 24,
		})
	},
	sendUUID: (res, uuid) => {
		res.cookie("uuid", uuid, {
			httpOnly: true,
			sameSite: "None",
			secure: true,
			maxAge: 60 * 60 * 24,
		})
	},
	isAuthorized: (req) => {
		const authorization = req.headers.token
		if (!authorization) {
			return null
		}
		try {
			return jwt.verify(authorization, process.env.JWT_SECRET)
		} catch (err) {
			// return null if invalid token
			return null
		}
	},
	//iv 값이 필요한지는 더 찾아보자
	encrypt: async (data, aesKey) => {
		return await CryptoJS.AES.encrypt(JSON.stringify(data), aesKey).toString()
	},
	decrypt: async (encryptedData, aesKey) => {
		try {
			const bytes = CryptoJS.AES.decrypt(encryptedData, aesKey)
			return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
		} catch (err) {
			console.log(err)
			return
		}
	},
	uuid: () => {
		const tokens = uuid4().split("-")
		return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4]
	},
}
