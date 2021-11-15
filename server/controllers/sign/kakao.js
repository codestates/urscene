const axios = require("axios");
const { User } = require("../../models");
const { encrypt, uuid, sendToken, sendUUID } = require("../../lib/jwt");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
	const authcode = req.body.authorizationCode;
	if (!authcode) {
		res.status(403).json({ message: "Invalid Authorization Code" });
	} else {
		const url = `https://kauth.kakao.com/oauth/token?code=${authcode}&client_id=${process.env.KAKAOID}&client_secret=${process.env.KAKAO_SECRET}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&grant_type=authorization_code`;

		const data = await axios.post(
			url,
			{
				headers: { accept: `application/x-www-form-urlencoded` },
			},
			{
				property_keys: ["kakao_account.email"],
			}
		);
		const token = data.data.access_token;
		const kakaodata = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		if (!kakaodata) {
			res.status(404).json({ message: "kakaodata-not-found" });
		} else {
			const userinfo = await User.findOrCreate({
				where: { email: kakaodata.data.kakao_account.email, nickname: kakaodata.data.properties.nickname },
				defaults: { image: 1 },
			});
			const { id, nickname } = userinfo[0].dataValues;
			const sortedUUID = uuid();
			const encryptedUUID = await encrypt(sortedUUID, process.env.ENCRYPTION_KEY);
			const Token = jwt.sign({ id: id, uuid: encryptedUUID }, process.env.JWT_SECRET, {
				expiresIn: "1d",
				issuer: "urscene",
			});
			sendToken(res, Token);
			sendUUID(res, sortedUUID);
			return res.status(200).json({ nickname, message: "user-created" });
		}
	}
};
