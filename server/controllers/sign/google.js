require("dotenv").config()

const clientID = process.env.GOOGLE_CLIENT_ID
const clientSecret = process.env.GOOGLE_CLIENT_SECRET
const axios = require("axios")

module.exports = (req, res) => {
	const url = "https://www.googleapis.com/oauth2/v4/token"
	console.log(req.body)

	const data = {
		client_id: clientID,
		client_secret: clientSecret,
		code: req.body.authorizationCode,
	}

	axios
		.post(url, data, {
			headers: { accept: "application/json" },
		})
		.then((res) => {
			accessToken = res.data.access_token
			res.status(200).json({ accessToken })
		})
		.catch((e) => {
			res.status(404)
		})
}
