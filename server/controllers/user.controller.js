const jwt = require("jsonwebtoken")
const { validator, passwordRegex } = require("../lib/regex")
const bcrypt = require("bcrypt")
const db = require("../db")
require("dotenv").config()

module.exports = {
	signUp: async (req, res) => {
		try {
			const { email, nickname, password } = req.body

			const isInvalid = validator(email, password, nickname)
			if (isInvalid) {
				return res.status(isInvalid.code).json({ message: isInvalid.message })
			}

			const userByEmail = await db.getUserByEmail(email)
			if (userByEmail) {
				return res.status(409).send({ email, message: "email-aready-exists" })
			}

			const userByName = await db.getUserByName(nickname)
			if (userByName) {
				return res.status(409).send({ nickname, message: "name-aready-exists" })
			}

			await db.addUser({ email, nickname, password })
			res.status(201).json({ nickname, message: "user-created" })
		} catch (err) {
			res.status(500).json({ message: "server-error" })
		}
	},

	signIn: async (req, res) => {
		try {
			const { email, password } = req.body
			console.log(email, password)
			// request로부터 받은 userId, password와 일치하는 유저가 DB에 존재하는지 확인합니다.
			// 일치하는 유저가 없을 경우:
			// 로그인 요청을 거절합니다.
			// 일치하는 유저가 있을 경우:
			// 필요한 데이터를 담은 두 종류의 JWT(access, refresh)를 생성합니다.
			// 생성한 JWT를 적절한 방법으로 반환합니다.
			// access token은 클라이언트에서 react state로 다루고 있습니다.
			// refresh token은 클라이언트의 쿠키에서 다루고 있습니다.
			const authenticatedUser = await db.authenticateUser(email, password)
			if (!authenticatedUser) {
				return res.status(400).send({ email, message: "invalid-data" })
			}
		} catch (err) {
			res.status(500).json({ message: "server-error" })
		}
	},

	// signOut: (req, res) => {},

	// info: (req, res) => {},

	// deleteUser: (req, res) => {},

	// gallery: (req, res) => {},

	// patchUser: (req, res) => {},
}
