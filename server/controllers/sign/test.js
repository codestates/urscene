// const jwt = require("jsonwebtoken")
// // const bcrypt = require("bcrypt")
// const db = require("../../db")
// const { decrypt, isAuthorized } = require("../../lib/jwt")

// require("dotenv").config()

// module.exports = async (req, res) => {
// 	try {
// 		const uuid = "408a5ceda517c59ebade067f71c56f72"
// 		const token =
// 			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiVTJGc2RHVmtYMStwMFNUK1dFNkIxTGJSQy9wTW9oRG01Vm84QnFDZVQrTHdHMEUrL2xaeDkvd0VGSk56QjZ2eUplMDZOWDJyU2JYY3JZMHpMOURhRnc9PSIsImVtYWlsIjoia2pzc2FhM0BnbWFpbC5jb20iLCJpYXQiOjE2MzU3NTEyNTMsImV4cCI6MTYzODM0MzI1MywiaXNzIjoidXJzY2VuZSJ9._ABzXO78Gzcbw4VB2e0mZNeOpgOwYROohOOUMrMZTE4"

// 		if (!token) {
// 			//data
// 			return res.status(400).json({ message: "not-authorized" })
// 		}
// 		const data = jwt.verify(token, process.env.JWT_SECRET)
// 		console.log(data)
// 		// data.uuid
// 		// data.email
// 		const decryptedUUID = await decrypt(data.uuid, process.env.ENCRYPTION_KEY)
// 		console.log("decryptedUUID:", decryptedUUID)
// 		if (uuid === decryptedUUID) {
// 			const user = await db.getUserByEmail(data.email)
// 			const userinfo = user.dataValues
// 			return res.status(200).json({ userinfo })
// 		}
// 		return res.status(400).json({ message: "invalid-token" })
// 	} catch (err) {
// 		res.status(500).json({ message: "server-error" })
// 	}
// }
