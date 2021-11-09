const axios = require("axios")
const { User } = require("../../models")
const { encrypt, uuid, sendToken, sendUUID } = require("../../lib/jwt")
const jwt = require("jsonwebtoken")

module.exports = async (req, res) => {
	const authcode = req.body.authorizationCode

	const url = `https://kauth.kakao.com/oauth/token?code=${authcode}&client_id=${process.env.KAKAOID}&client_secret=${process.env.KAKAO_SECRET}&redirect_uri=http://localhost:3000&grant_type=authorization_code`

	const data = await axios.post(
		url,
		{
			headers: { accept: `application/x-www-form-urlencoded` },
		},
		{
			property_keys: ["kakao_account.email"],
		}
	)
	console.log(data)
	const token = data.data.access_token
	axios
		.get(`https://kapi.kakao.com/v2/user/me`, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
		.then((data) =>
			User.findOrCreate({
				where: { email: 오어쓰이메일, nickname: 오어쓰닉네임 },
			})
		)
	const sortedUUID = uuid()
	const encryptedUUID = await encrypt(sortedUUID, process.env.ENCRYPTION_KEY)
	const Token = jwt.sign({ id: id, uuid: encryptedUUID }, process.env.JWT_SECRET, {
		expiresIn: "1d",
		issuer: "urscene",
	})

	sendToken(res, Token)
	sendUUID(res, sortedUUID)
	res
		.status(200)
		.json({ message: "??" })

		.catch((error) => {
			console.log(error)
		})
}
