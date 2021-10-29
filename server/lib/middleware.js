const passport = require("passport")
const db = require("../db")
const bcrypt = require("bcrypt")

module.exports = {
	isLoggedIn: (req, res, next) => {
		passport.authenticate("jwt", { session: false }, (err, user) => {
			if (err || !user) {
				return res.status(401).json({ message: "unauthorized-user" })
			}
			req.userInfo = user
			next()
		})(req, res, next)
	},
	isLoggedOut: (req, res, next) => {
		passport.authenticate("jwt", { session: false }, (err, user) => {
			if (err || !user) {
				return next()
			}

			res.status(409).json({ email: user.email, message: "already-login" })
		})(req, res, next)
	},
	isAdmin: (req, res, next) => {
		passport.authenticate("jwt", { session: false }, async (err, user) => {
			if (err || !user) {
				return res.status(401).json({ message: "unauthorized-user" })
			}

			if (user.role) {
				req.userInfo = user
				return next()
			}

			res.status(401).json({ message: "permission-required" })
		})(req, res, next)
	},
	isPasswordMatch: async (req, res, next) => {
		const user = await db.getUserByName(req.userInfo.name)
		const isMatch = await bcrypt.compare(req.body.password, user.password)
		if (!isMatch) {
			return res.status(401).json({ message: "invalid-password" })
		}

		next()
	},
}
