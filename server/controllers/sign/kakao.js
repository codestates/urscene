const axios = require("axios")

module.exports = async (req, res) => {
	const url = "https://kauth.kakao.com/oauth/token"
	const code = req.body.code || req.query.code //??
	const data = {
		code: code,
		client_id: process.env.KAKAOID,
		client_secret: process.env.KAKAOSECRET,
		redirect_uri: "https://      /oauth/oauth",
		grant_type: "authorization_code",
	}

	let token = await axios.post(url, data, {
		Headers: { accept: "application/json" },
	})
	await axios.get({
		url: `https://kapi.kakao.com/v2/user/me`,
		headers: {
			Authorization: `Token ${token.data.access_token}`,
		},
	})
}
